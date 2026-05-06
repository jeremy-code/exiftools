import {
  Link as AriaLink,
  type LinkProps as AriaLinkProps,
} from "react-aria-components/Link";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { tv, type VariantProps } from "tailwind-variants";

import { focusRing } from "../utils/focusRing";

const linkVariants = tv({
  extend: focusRing,
  base: [
    "inline-flex items-center gap-1 decoration-from-font underline-offset-1 transition-colors transition-discrete [-webkit-tap-highlight-color:transparent]",
    "disabled:cursor-default disabled:no-underline forced-colors:disabled:text-[GrayText]",
  ],
  variants: {
    underline: {
      true: "underline decoration-current/50 hover:decoration-current/80",
      false: "no-underline",
      hover:
        "decoration-transparent hover:underline hover:decoration-current/80",
    },
    color: {
      blue: "text-blue-600 dark:text-blue-500",
      default: "text-fg-bold",
    },
  },
  defaultVariants: {
    underline: "hover",
    color: "default",
  },
});

type LinkProps = AriaLinkProps & VariantProps<typeof linkVariants>;

const Link = ({ className, underline, color, ...props }: LinkProps) => {
  return (
    <AriaLink
      {...props}
      className={composeRenderProps(className, (className, renderProps) =>
        linkVariants({ ...renderProps, className, underline, color }),
      )}
    />
  );
};

export { Link, type LinkProps, linkVariants };
