import { millisecondsInSecond } from "date-fns/constants";
import { Decimal } from "decimal.js";
import {
  exifFormatGetSize,
  mapRationalFromObject,
  mapRationalToObject,
} from "libexif-wasm";

import { MAX_UINT32_VALUE } from "#lib/exif/constants";
import { newTypedArrayInFormat } from "#lib/exif/newTypedArrayInFormat";
import { approximateRational } from "#lib/math/approximateRational";

import type { QuickEditorResolver } from "../types";

const parseTimeStampValue = (value: number[]) => {
  const timeStampValue = mapRationalToObject(
    newTypedArrayInFormat(value, "RATIONAL"),
  );

  if (timeStampValue.length !== 3) {
    throw new Error(
      `Unexpected number of inputs for tag TIME_STAMP, expected 3, got ${timeStampValue.length}`,
    );
  }
  const [hours, minutes, seconds] = timeStampValue.map((rational) =>
    Decimal(rational.numerator).div(rational.denominator),
  );
  if (hours === undefined || minutes === undefined || seconds === undefined) {
    throw new Error(
      "Hours, minutes, and seconds are required for tag TIME_STAMP",
    );
  }
  const milliseconds = seconds.mod(1).mul(millisecondsInSecond).toNumber();

  return Temporal.PlainTime.from({
    hour: hours.toNumber(),
    minute: minutes.toNumber(),
    second: seconds.toNumber(),
    millisecond: milliseconds,
  });
};
const resolveTimeStamp: QuickEditorResolver = (
  exifEntryObject,
  onValueChange,
) => {
  if (
    exifEntryObject.tag === "TIME_STAMP" &&
    exifEntryObject.ifd === "GPS" &&
    exifEntryObject.format === "RATIONAL" &&
    // hours, minutes, seconds
    exifEntryObject.components === 3 &&
    exifEntryObject.size === exifFormatGetSize("RATIONAL") * 3
  ) {
    return {
      kind: "timeStamp",
      exifEntryObject,
      value: parseTimeStampValue(exifEntryObject.value),
      onValueChange: (value) =>
        onValueChange(
          mapRationalFromObject(
            [
              value.hour,
              value.minute,
              new Decimal(value.second).plus(
                new Decimal(value.millisecond).div(millisecondsInSecond),
              ),
            ].map((timeComponent) =>
              approximateRational(timeComponent, MAX_UINT32_VALUE),
            ),
            "RATIONAL",
          ),
        ),
    };
  }

  return null;
};

export { resolveTimeStamp };
