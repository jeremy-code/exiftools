import type { RationalObject } from "libexif-wasm";

import { approximateRational } from "#lib/math/approximateRational";
import { dayjs } from "#utils/date";
import { Input, type InputProps } from "@exifi/ui/components/Input";

const parseTimeStampValue = (timeStampValue: RationalObject[]) => {
  if (timeStampValue.length !== 3) {
    throw new Error(
      `Unexpected number of inputs for tag TIME_STAMP, expected 3, got ${timeStampValue.length}`,
    );
  }
  const [hours, minutes, seconds] = timeStampValue.map(
    (rational) => rational.numerator / rational.denominator,
  );
  if (hours === undefined || minutes === undefined || seconds === undefined) {
    throw new Error(
      "Hours, minutes, and seconds are required for tag TIME_STAMP",
    );
  }

  return dayjs({ hours, minutes, seconds });
};

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
  const timeStamp = parseTimeStampValue(value);

  return (
    <Input
      {...props}
      type="time"
      value={timeStamp.format("HH:mm:ss")}
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

export { TimeStampInput, type TimeStampInputProps };
