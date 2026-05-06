import {
  Button as AriaButton,
  type ButtonProps as FieldButtonProps,
} from "react-aria-components/Button";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { tv } from "tailwind-variants";

import { focusRing } from "../utils/focusRing";

const fieldButtonVariants = tv({
  extend: focusRing,
  base: [
    "relative inline-flex cursor-default items-center justify-center rounded-sm bg-transparent p-1 text-center text-sm text-fg-muted transition [-webkit-tap-highlight-color:transparent]",
  ],
  variants: {
    isHovered: {
      true: "bg-bg-muted",
    },
    isPressed: {
      true: "bg-border",
    },
    isDisabled: {
      true: [
        "bg-neutral-100 text-neutral-300",
        "dark:bg-neutral-800 dark:text-neutral-600",
        "forced-colors:text-[GrayText]",
      ],
    },
  },
});

const FieldButton = (props: FieldButtonProps) => {
  return (
    <AriaButton
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        fieldButtonVariants({ ...renderProps, className }),
      )}
    />
  );
};

export { FieldButton, type FieldButtonProps };
