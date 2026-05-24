import { Time } from "@internationalized/date";
import { millisecondsInSecond } from "date-fns/constants";
import { Decimal } from "decimal.js";
import { exifFormatGetSize, mapRationalFromObject } from "libexif-wasm";

import { MAX_UINT32_VALUE } from "#lib/exif/constants";
import { mapRationalArray } from "#lib/exif/mapRationalArray";
import { approximateRational } from "#lib/math/approximateRational";

import type { QuickEditorResolver } from "../types";

const parseTimeStampValue = (value: number[]) => {
  const timeStampValue = mapRationalArray(value);

  if (timeStampValue.length !== 3) {
    throw new Error(
      `Unexpected number of inputs for tag TIME_STAMP, expected 3, got ${timeStampValue.length}`,
    );
  }
  const [hour, minute, second] = timeStampValue;
  if (hour === undefined || minute === undefined || second === undefined) {
    throw new Error(
      "Hours, minutes, and seconds are required for tag TIME_STAMP",
    );
  }
  const millisecond = new Decimal(second.numerator)
    .div(second.denominator)
    .mod(1)
    .mul(millisecondsInSecond)
    .toNumber();

  return new Time(
    hour.valueOf(),
    minute.valueOf(),
    Math.floor(second.valueOf()),
    millisecond,
  );
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
