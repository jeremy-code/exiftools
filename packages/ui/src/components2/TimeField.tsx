import {
  TimeField as AriaTimeField,
  type TimeFieldProps as AriaTimeFieldProps,
  type TimeValue,
} from "react-aria-components/TimeField";

import { DateInput } from "./DateInput";
import { Description, FieldError, Label, type FieldErrorMessage } from "./form";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";

type TimeFieldProps<T extends TimeValue> = {
  label?: string;
  description?: string;
  errorMessage?: FieldErrorMessage;
} & AriaTimeFieldProps<T>;

const TimeField = <T extends TimeValue>({
  className,
  label,
  description,
  errorMessage,
  ...props
}: TimeFieldProps<T>) => {
  return (
    <AriaTimeField
      {...props}
      className={composeTailwindRenderProps(className, "flex flex-col gap-1")}
    >
      {label && <Label>{label}</Label>}
      <DateInput />
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </AriaTimeField>
  );
};

export { TimeField, type TimeFieldProps };
