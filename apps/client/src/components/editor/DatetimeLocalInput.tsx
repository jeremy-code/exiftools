import { CalendarDateTime } from "@internationalized/date";
import type { Dayjs } from "dayjs";

import { dayjs } from "#utils/date";
import {
  DatePicker,
  type DatePickerProps,
} from "@exifi/ui/components2/DatePicker";

type DatetimeLocalInputProps = {
  value?: Dayjs;
  onValueChange?: (datetimeLocal: Dayjs) => void;
} & Omit<DatePickerProps<CalendarDateTime>, "value">;

const DatetimeLocalInput = ({
  value,
  onValueChange,
  ...props
}: DatetimeLocalInputProps) => {
  return (
    <DatePicker
      {...props}
      granularity="second"
      value={
        value === undefined ? undefined : (
          new CalendarDateTime(
            value.year(),
            value.month() + 1,
            value.date(),
            value.hour(),
            value.minute(),
            value.second(),
            value.millisecond(),
          )
        )
      }
      onChange={(value) => {
        if (value !== null) {
          const dateTimeLocal = dayjs(value.toString());

          if (!dateTimeLocal.isValid()) {
            throw new Error(
              "An error occurred in DatetimeLocalInput, expected a valid date time.",
            );
          }
          onValueChange?.(dateTimeLocal);
        }
      }}
    />
  );
};
export { DatetimeLocalInput, type DatetimeLocalInputProps };
