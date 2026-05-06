import {
  FieldError as AriaFieldError,
  type FieldErrorProps,
} from "react-aria-components/FieldError";

import { composeTailwindRenderProps } from "../../utils/composeTailwindRenderProps";

const FieldError = ({ className, ...props }: FieldErrorProps) => {
  return (
    <AriaFieldError
      {...props}
      className={composeTailwindRenderProps(
        className,
        "text-sm text-destructive forced-colors:text-[Mark]",
      )}
    />
  );
};

export { FieldError, type FieldErrorProps };
