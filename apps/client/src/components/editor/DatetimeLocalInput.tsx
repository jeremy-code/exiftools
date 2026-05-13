import { Temporal } from "temporal-polyfill";

import { Input, type InputProps } from "@exifi/ui/components/Input";

type DatetimeLocalInputProps = {
  value?: Temporal.PlainDateTime;
  onValueChange?: (datetimeLocal: Temporal.PlainDateTime) => void;
} & Omit<InputProps, "value">;

const DatetimeLocalInput = ({
  value,
  onValueChange,
  ...props
}: DatetimeLocalInputProps) => {
  return (
    <Input
      {...props}
      type="datetime-local"
      value={value?.toString()}
      onChange={(e) => {
        if (e.target.value !== "") {
          onValueChange?.(Temporal.PlainDateTime.from(e.target.value));
        }
      }}
    />
  );
};
export { DatetimeLocalInput };
