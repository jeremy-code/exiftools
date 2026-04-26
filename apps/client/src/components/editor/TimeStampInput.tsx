import type { RationalObject } from "libexif-wasm";

import { approximateRational } from "#lib/math/approximateRational";
import { dayjs } from "#utils/date";
import { Input, type InputProps } from "@exifi/ui/components/Input";

type TimeStampInputProps = {
  value: RationalObject[];
  onValueChange: (value: RationalObject[]) => void;
} & Omit<InputProps, "value">;

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
  const date = dayjs({
    hours,
    minutes,
    seconds,
  });

  return (
    <Input
      {...props}
      type="time"
      value={date.format("HH:mm:ss")}
      onChange={(event) => {
        if (event.target.valueAsDate) {
          const newDate = dayjs.utc(event.target.valueAsDate);

          onValueChange(
            [newDate.hour(), newDate.minute(), newDate.second()].map((value) =>
              approximateRational(
                value,
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

export { TimeStampInput };
