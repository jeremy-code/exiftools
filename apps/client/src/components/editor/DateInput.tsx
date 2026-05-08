import { CalendarDate } from "@internationalized/date";
import { Dayjs } from "dayjs";

import { dayjs } from "#utils/date";
import {
  DateField,
  type DateFieldProps,
} from "@exifi/ui/components2/DateField";

type DateInputProps = {
  value: Dayjs;
  onValueChange: (date: Dayjs) => void;
} & Omit<DateFieldProps<CalendarDate>, "value">;

const DateInput = ({ value, onValueChange, ...props }: DateInputProps) => {
  return (
    <DateField
      {...props}
      value={new CalendarDate(value.year(), value.month() + 1, value.date())}
      onChange={(value) => {
        onValueChange?.(dayjs(value?.toString()));
      }}
    />
  );
};

export { DateInput };
