import { Check, Minus } from "lucide-react";
import {
  Checkbox as AriaCheckbox,
  type CheckboxProps,
} from "react-aria-components/Checkbox";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { tv } from "tailwind-variants";

import { focusRing } from "../utils/focusRing";

const checkboxVariants = tv({
  base: "group/checkbox relative flex items-center gap-2 font-sans text-sm transition [-webkit-tap-highlight-color:transparent]",
  variants: {
    isDisabled: {
      false: "text-color-fg-bolder",
      true: "cursor-not-allowed text-border forced-colors:text-[GrayText]",
    },
  },
});

const boxVariants = tv({
  extend: focusRing,
  base: "box-border flex size-4.5 shrink-0 items-center justify-center rounded-sm border transition",
  variants: {
    isSelected: {
      false:
        "border-(--color) bg-(--color-surface) [--color:var(--color-border)] group-hover/checkbox:[--color:var(--color-fg-subtle)] group-pressed/checkbox:[--color:var(--color-fg-muted)]",
      true: "border-(--color) bg-(--color) [--color:var(--color-fg-bolder)] group-pressed/checkbox:[--color:var(--color-fg-bolder)] forced-colors:[--color:Highlight]!",
    },
    isInvalid: {
      true: "[--color:var(--color-red-700)] group-pressed/checkbox:[--color:var(--color-red-800)] dark:[--color:var(--color-red-600)] dark:group-pressed/checkbox:[--color:var(--color-red-700)] forced-colors:[--color:Mark]!",
    },
    isDisabled: {
      true: "[--color:var(--color-bg-muted)] forced-colors:[--color:GrayText]!",
    },
  },
});

const iconVariants =
  "size-3.5 text-surface group-disabled/checkbox:text-fg-subtle forced-colors:text-[HighlightText] pointer-events-none";

const Checkbox = ({ className, children, ...props }: CheckboxProps) => {
  return (
    <AriaCheckbox
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        checkboxVariants({ ...renderProps, className }),
      )}
    >
      {composeRenderProps(
        children,
        (children, { isSelected, isIndeterminate, ...renderProps }) => (
          <>
            <div
              className={boxVariants({
                isSelected: isSelected || isIndeterminate,
                ...renderProps,
              })}
            >
              {isIndeterminate ?
                <Minus aria-hidden className={iconVariants} />
              : isSelected ?
                <Check aria-hidden className={iconVariants} />
              : null}
            </div>
            {children}
          </>
        ),
      )}
    </AriaCheckbox>
  );
};

export { Checkbox, type CheckboxProps, checkboxVariants };
