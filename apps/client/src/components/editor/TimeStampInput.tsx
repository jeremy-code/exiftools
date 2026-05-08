import { Time } from "@internationalized/date";
import type { RationalObject } from "libexif-wasm";

import { approximateRational } from "#lib/math/approximateRational";
import {
  TimeField,
  type TimeFieldProps,
} from "@exifi/ui/components2/TimeField";

type TimeStampInputProps = {
  value: RationalObject[];
  onValueChange: (value: RationalObject[]) => void;
} & Omit<TimeFieldProps<Time>, "value" | "onChange">;

const MAX_UINT32_VALUE = 0xffffffff;

const TimeStampInput = ({
  value,
  onValueChange,
  ...props
}: TimeStampInputProps) => {
  const [hoursRational, minutesRational, secondsRational] = value;

  if (!hoursRational || !minutesRational || !secondsRational) {
    throw new Error("Invalid number of inputs for tag TIME_STAMP");
  }

  const hours = hoursRational.numerator / hoursRational.denominator;
  const minutes = minutesRational.numerator / minutesRational.denominator;
  const seconds = secondsRational.numerator / secondsRational.denominator;
  const date = new Time(hours, minutes, seconds);

  return (
    <TimeField
      {...props}
      granularity="second"
      value={date}
      onChange={(value) => {
        if (value !== null) {
          onValueChange(
            [value.hour, value.minute, value.second].map((timeComponent) =>
              approximateRational(
                timeComponent,
                undefined,
                undefined,
                MAX_UINT32_VALUE,
                MAX_UINT32_VALUE,
              ),
            ),
          );
        }
      }}
    />
  );
};

export { TimeStampInput, type TimeStampInputProps };
