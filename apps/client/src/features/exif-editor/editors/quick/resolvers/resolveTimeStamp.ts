import { Time } from "@internationalized/date";
import { Decimal } from "decimal.js";
import {
  exifFormatGetSize,
  mapRationalFromObject,
  mapRationalToObject,
} from "libexif-wasm";

import { newTypedArrayInFormat } from "#lib/exif/newTypedArrayInFormat";
import { approximateRational } from "#lib/math/approximateRational";

import type { QuickEditorResolver } from "../types";

const MAX_UINT32_VALUE = 0xffffffff;
const MILLISECONDS_IN_SECONDS = 1000;

const parseTimeStamp = (value: number[]) => {
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

  return new Time(
    hours.toNumber(),
    minutes.toNumber(),
    seconds.trunc().toNumber(),
    seconds.modulo(1).mul(MILLISECONDS_IN_SECONDS).toNumber(),
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
      value: parseTimeStamp(exifEntryObject.value),
      onValueChange: (value) =>
        onValueChange(
          mapRationalFromObject(
            [value.hour, value.minute, value.second].map((timeComponent) =>
              approximateRational(new Decimal(timeComponent), MAX_UINT32_VALUE),
            ),
            "RATIONAL",
          ),
        ),
    };
  }

  return null;
};

export { resolveTimeStamp };
