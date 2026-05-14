import {
  OverlayArrow as AriaOverlayArrow,
  type OverlayArrowProps as AriaOverlayArrowProps,
} from "react-aria-components/Popover";
import { cn } from "tailwind-variants";

import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";

type OverlayArrowProps = Omit<AriaOverlayArrowProps, "children">;

const OverlayArrow = ({ className, ...props }: OverlayArrowProps) => {
  return (
    <AriaOverlayArrow
      className={composeTailwindRenderProps(
        className,
        "group/overlay-arrow size-3",
      )}
      {...props}
    >
      <svg
        viewBox="0 0 12 12"
        className={cn(
          "block size-full shrink-0 fill-surface stroke-border stroke-1",
          "group-placement-left/overlay-arrow:-rotate-90 group-placement-right/overlay-arrow:rotate-90 group-placement-bottom/overlay-arrow:rotate-180",
          "forced-colors:fill-[Canvas] forced-colors:stroke-[ButtonBorder]",
        )}
      >
        <path d="M0 0 L6 6 L12 0" vectorEffect="non-scaling-stroke" />
      </svg>
    </AriaOverlayArrow>
  );
};

export { OverlayArrow, type OverlayArrowProps };
