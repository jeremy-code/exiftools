import {
  useImperativeHandle,
  useRef,
  type ComponentPropsWithoutRef,
  type ComponentPropsWithRef,
  type CSSProperties,
  type ReactNode,
  type RefObject,
} from "react";

import {
  useVirtualizer,
  type VirtualItem,
  type Virtualizer,
} from "@tanstack/react-virtual";
import { cn } from "tailwind-variants";

type VirtualizedListProps = {
  virtualizerRef: RefObject<Virtualizer<HTMLDivElement, HTMLDivElement> | null>;
  children: (props: VirtualItem) => ReactNode;
  virtualizerOptions: Omit<
    Parameters<typeof useVirtualizer<HTMLDivElement, HTMLDivElement>>[0],
    "getScrollElement"
  >;
  containerProps?: ComponentPropsWithRef<"div">;
} & ComponentPropsWithoutRef<"div">;

const VirtualizedList = ({
  className,
  children,
  virtualizerRef,
  virtualizerOptions,
  containerProps,
  ...props
}: VirtualizedListProps) => {
  const scrollElementRef = useRef<HTMLDivElement>(null);
  const virtualizer = useVirtualizer<HTMLDivElement, HTMLDivElement>({
    ...virtualizerOptions,
    getScrollElement: () => scrollElementRef.current,
  });

  useImperativeHandle(virtualizerRef, () => virtualizer);

  return (
    <div
      ref={scrollElementRef}
      className={cn("overflow-auto", className)}
      {...props}
    >
      <div
        {...containerProps}
        className={cn(
          "relative h-(--total-size) w-full",
          containerProps?.className,
        )}
        style={
          {
            "--total-size": `${virtualizer.getTotalSize()}px`,
            ...containerProps?.style,
          } as CSSProperties
        }
      >
        {virtualizer.getVirtualItems().map((virtualItem) => (
          <div
            key={virtualItem.key}
            ref={virtualizer.measureElement}
            className="absolute top-0 left-0 h-(--height) translate-y-(--translate-y)"
            style={
              {
                "--translate-y": `${virtualItem.start}px`,
                "--height": `${virtualItem.size}px`,
              } as CSSProperties
            }
            data-index={virtualItem.index}
          >
            {children(virtualItem)}
          </div>
        ))}
      </div>
    </div>
  );
};

export { VirtualizedList };
