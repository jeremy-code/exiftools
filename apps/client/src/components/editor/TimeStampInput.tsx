import { Time } from "@internationalized/date";

import {
  TimeField,
  type TimeFieldProps,
} from "@exifi/ui/components2/TimeField";

type TimeStampInputProps = {
  value: Time;
  onValueChange: (value: Time) => void;
} & Omit<TimeFieldProps<Time>, "value" | "onChange">;

const TimeStampInput = ({
  value,
  onValueChange,
  ...props
}: TimeStampInputProps) => {
  return (
    <TimeField
      {...props}
      granularity="second"
      value={value}
      onChange={(value) => {
        if (value !== null) {
          onValueChange(value);
        }
      }}
    />
  );
};

export { TimeStampInput, type TimeStampInputProps };
