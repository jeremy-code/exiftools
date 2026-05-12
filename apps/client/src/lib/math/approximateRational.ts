import { Decimal } from "decimal.js";
import type { RationalObject } from "libexif-wasm";

const approximateRational = (
  value: Decimal.Value,
  maxNumerator?: Decimal.Value,
): RationalObject => {
  const [numerator, denominator] = new Decimal(value).toFraction(maxNumerator);

  if (numerator === undefined || denominator === undefined) {
    throw new Error("Could not convert value to Rational");
  }

  return {
    numerator: numerator.toNumber(),
    denominator: denominator.toNumber(),
  };
};

export { approximateRational };
