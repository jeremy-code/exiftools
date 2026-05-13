import { Temporal } from "temporal-polyfill";

import { Input, type InputProps } from "@exifi/ui/components/Input";

type TimeStampInputProps = {
  value: Temporal.PlainTime;
  onValueChange: (value: Temporal.PlainTime) => void;
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
      value={value.toString({ smallestUnit: "second" })}
      onChange={(event) => {
        if (event.target.value !== "") {
          onValueChange(Temporal.PlainTime.from(event.target.value));
        }
      }}
    />
  );
};

export { TimeStampInput, type TimeStampInputProps };
