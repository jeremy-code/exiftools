import type { ComponentPropsWithRef } from "react";

import { ScrollArea as ScrollAreaPrimitive } from "radix-ui";
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
      "flex touch-none bg-muted/50 p-0.5 transition-colors select-none hover:bg-muted/80",
      "data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:flex-row",
      "data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:flex-col",
      className,
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-[10px] bg-subtle-foreground" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
);

export { ScrollArea, ScrollBar };
