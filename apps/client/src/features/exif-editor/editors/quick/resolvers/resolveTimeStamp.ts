import { Decimal } from "decimal.js";
import {
  exifFormatGetSize,
  mapRationalFromObject,
  mapRationalToObject,
} from "libexif-wasm";
import { Temporal } from "temporal-polyfill";

import { newTypedArrayInFormat } from "#lib/exif/newTypedArrayInFormat";
import { approximateRational } from "#lib/math/approximateRational";

import type { QuickEditorResolver } from "../types";

const MAX_UINT32_VALUE = 0xffffffff;

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
    Decimal(rational.numerator).div(rational.denominator).toNumber(),
  );
  if (hours === undefined || minutes === undefined || seconds === undefined) {
    throw new Error(
      "Hours, minutes, and seconds are required for tag TIME_STAMP",
    );
  }

  return Temporal.PlainTime.from({
    hour: hours,
    minute: minutes,
    second: seconds,
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
            [value.hour, value.minute, value.second].map((timeComponent) =>
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
