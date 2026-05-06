import {
  Input as AriaInput,
  type InputProps,
} from "react-aria-components/Input";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { tv } from "tailwind-variants";

const inputVariants = tv({
  base: [
    "flex h-9 w-full appearance-none rounded border-0 border-border bg-surface px-3 py-1 text-start text-sm outline-0 transition-opacity",
    "file:border-0 file:bg-transparent file:text-sm file:font-medium",
    "placeholder:text-solid",
  ],
  variants: {
    isHovered: {
      true: "border-fg-subtle",
    },
    isFocused: {
      true: "border-fg-muted",
    },
    size: {
      xs: "h-8 min-w-8 px-2 text-xs/4",
      sm: "h-9 min-w-9 px-2.5 text-sm/5",
      md: "h-10 min-w-10 px-3 text-sm/5",
      lg: "h-11 min-w-11 px-4 text-base/6",
    },
    isDisabled: {
      true: "cursor-not-allowed bg-bg-muted opacity-80",
    },
    isInvalid: {
      true: "border-destructive",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

const Input = ({ className, ...props }: InputProps) => {
  return (
    <AriaInput
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        inputVariants({ ...renderProps, className }),
      )}
    />
  );
};

export { Input, type InputProps, inputVariants };
