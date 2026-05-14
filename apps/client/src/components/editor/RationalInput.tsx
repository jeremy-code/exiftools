import { useMemo, useState } from "react";

import { Decimal } from "decimal.js";
import type { RationalObject } from "libexif-wasm";

import { approximateRational } from "#lib/math/approximateRational";
import {
  NumberField,
  type NumberFieldProps,
} from "@exifi/ui/components/NumberField";

type RationalInputProps = {
  initialRational?: RationalObject | undefined;
  setRational?: (rational: RationalObject) => void;
  numeratorInputProps?: Omit<NumberFieldProps, "value" | "onChange">;
  denominatorInputProps?: Omit<NumberFieldProps, "value" | "onChange">;
  decimalInputProps?: Omit<NumberFieldProps, "value" | "onChange">;
} & Omit<NumberFieldProps, "value" | "onChange">;

const RationalInput = ({
  initialRational,
  setRational,
  numeratorInputProps,
  denominatorInputProps,
  decimalInputProps,
  ...sharedProps
}: RationalInputProps) => {
  const [numerator, setNumerator] = useState(initialRational?.numerator ?? 0);
  const [denominator, setDenominator] = useState(
    initialRational?.denominator ?? 0,
  );
  const decimal = useMemo(
    () =>
      numerator !== undefined && denominator !== undefined ?
        new Decimal(numerator).div(denominator).toNumber()
      : NaN,
    [numerator, denominator],
  );

  return (
    <div className="flex items-center gap-2">
      <NumberField
        {...sharedProps}
        {...numeratorInputProps}
        value={numerator}
        onChange={(value) => {
          setNumerator(value);
          setRational?.({ numerator: value, denominator });
        }}
      />
      /
      <NumberField
        {...sharedProps}
        {...denominatorInputProps}
        value={denominator}
        onChange={(value) => {
          setDenominator(value);
          setRational?.({
            numerator,
            denominator: value,
          });
        }}
      />
      =
      <NumberField
        {...sharedProps}
        {...decimalInputProps}
        value={decimal}
        onChange={(value) => {
          const rational = approximateRational(value);
          setNumerator(rational.numerator);
          setDenominator(rational.denominator);
          setRational?.(rational);
        }}
      />
    </div>
  );
};

export { RationalInput, type RationalInputProps };
