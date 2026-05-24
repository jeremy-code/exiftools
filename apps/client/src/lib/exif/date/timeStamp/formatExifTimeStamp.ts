import type { Time } from "@internationalized/date";
import { Decimal } from "decimal.js";

import { MAX_UINT32_VALUE } from "#lib/exif/constants";
import { approximateRational } from "#lib/math/approximateRational";

const MILLISECONDS_IN_SECOND = 1000;

const formatExifTimeStamp = (value: Time): number[] => {
  return [
    value.hour,
    value.minute,
    new Decimal(value.second).plus(
      new Decimal(value.millisecond).div(MILLISECONDS_IN_SECOND),
    ),
  ].flatMap((timeComponent) => {
    const rational = approximateRational(timeComponent, MAX_UINT32_VALUE);
    return [rational.numerator, rational.denominator];
  });
};

export { formatExifTimeStamp };
