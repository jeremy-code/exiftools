import type { Dayjs } from "dayjs";

import { dayjs } from "#utils/date";
import { Input, type InputProps } from "@exifi/ui/components/Input";

type TimeStampInputProps = {
  value: Dayjs;
  onValueChange: (value: Dayjs) => void;
} & Omit<InputProps, "value">;

const TimeStampInput = ({
  value,
  onValueChange,
  ...props
}: TimeStampInputProps) => {
  return (
    <Input
      {...props}
      type="time"
      value={value.format("HH:mm:ss")}
      onChange={(event) => {
        if (event.target.valueAsDate) {
          onValueChange(dayjs.utc(event.target.valueAsDate));
        }
      }}
    />
  );
};

export { TimeStampInput, type TimeStampInputProps };
