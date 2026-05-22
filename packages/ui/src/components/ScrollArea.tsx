import type { ComponentPropsWithRef } from "react";

import * as ScrollAreaPrimitive from "@radix-ui/react-scroll-area";
import { cn } from "tailwind-variants";

const ScrollArea = ({
  className,
  children,
  ...props
}: ComponentPropsWithRef<typeof ScrollAreaPrimitive.Root>) => (
  <ScrollAreaPrimitive.Root
    className={cn("overflow-hidden", className)}
    {...props}
  >
    <ScrollAreaPrimitive.Viewport className="size-full rounded-[inherit]">
      {children}
    </ScrollAreaPrimitive.Viewport>
    <ScrollBar orientation="horizontal" />
    <ScrollBar orientation="vertical" />
    <ScrollAreaPrimitive.Corner />
  </ScrollAreaPrimitive.Root>
);

const ScrollBar = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    className={cn(
      "flex touch-none bg-bg-muted/50 p-0.5 transition-colors select-none hover:bg-bg-muted/80",
      "orientation-vertical:w-2.5 orientation-vertical:flex-row",
      "orientation-horizontal:h-2.5 orientation-horizontal:flex-col",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-[10px] bg-fg-subtle" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
);

export { ScrollArea, ScrollBar };
