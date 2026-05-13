import { Temporal } from "temporal-polyfill";

import { Input, type InputProps } from "@exifi/ui/components/Input";

type DateInputProps = {
  value: Temporal.PlainDate;
  onValueChange: (date: Temporal.PlainDate) => void;
} & Omit<InputProps, "value">;

const DateInput = ({ value, onValueChange, ...props }: DateInputProps) => {
  return (
    <Input
      {...props}
      type="date"
      value={value.toString()}
      onChange={(event) => {
        if (event.target.value !== "") {
          onValueChange?.(Temporal.PlainDate.from(event.target.value));
        }
      }}
    />
  );
};

export { DateInput };
