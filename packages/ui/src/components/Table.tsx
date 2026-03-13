import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { cn, tv, type VariantProps } from "tailwind-variants";

const TableScrollArea = ({
  asChild,
  className,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={cn(
        "block max-w-full overflow-auto whitespace-nowrap",
        className,
      )}
      {...props}
    />
  );
};

const tableVariants = tv({
  base: "group/table w-full border-collapse text-start align-top lining-nums tabular-nums",
  variants: {
    variant: {
      line: "[&>*>tr]:border-b",
      outline:
        "ring ring-border [&>*>tr]:not-last:border-b [&>tbody>tr]:first:border-t [&>tfoot>tr]:border-t",
    },
    size: {
      sm: "text-sm/5 [--table-padding-x:--spacing(2)] [--table-padding-y:--spacing(2)]",
      md: "text-sm/5 [--table-padding-x:--spacing(3)] [--table-padding-y:--spacing(3)]",
      lg: "text-md/6 [--table-padding-x:--spacing(4)] [--table-padding-y:--spacing(3)]",
    },
    interactive: { true: null, false: null },
    stickyHeader: {
      true: "[&>thead>tr]:sticky [&>thead>tr]:top-0 [&>thead>tr]:z-1",
      false: null,
    },
    striped: { true: null, false: null },
    showColumnBorder: { true: null, false: null },
  },
  defaultVariants: {
    variant: "line",
    size: "sm",
  },
});

type TableProps = PrimitivePropsWithRef<"table"> &
  VariantProps<typeof tableVariants>;

const Table = ({
  className,
  asChild,
  variant,
  size,
  interactive,
  stickyHeader,
  striped,
  showColumnBorder,
  ...props
}: TableProps) => {
  const Comp = asChild ? Slot.Root : "table";

  return (
    <Comp
      data-variant={variant}
      data-interactive={interactive}
      data-striped={striped}
      data-show-column-border={showColumnBorder}
      className={tableVariants({
        className,
        variant,
        size,
        stickyHeader,
        striped,
        showColumnBorder,
        interactive,
      })}
      {...props}
    />
  );
};

const TableBody = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"tbody">) => {
  const Comp = asChild ? Slot.Root : "tbody";

  return <Comp className={cn("table-row-group", className)} {...props} />;
};

const TableCell = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"td">) => {
  const Comp = asChild ? Slot.Root : "td";

  return (
    <Comp
      className={cn(
        "items-center px-(--table-padding-x) py-(--table-padding-y) text-start",
        "group-data-[show-column-border=true]/table:not-last:border-r",
        className,
      )}
      {...props}
    />
  );
};

const TableFooter = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"tfoot">) => {
  const Comp = asChild ? Slot.Root : "tfoot";

  return (
    <Comp
      className={cn("table-footer-group font-medium", className)}
      {...props}
    />
  );
};

const TableHeader = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"th">) => {
  const Comp = asChild ? Slot.Root : "th";

  return (
    <Comp
      className={cn(
        "px-(--table-padding-x) py-(--table-padding-y) text-start font-medium text-foreground",
        "group-data-[show-column-border=true]/table:not-last:border-r",
        className,
      )}
      {...props}
    />
  );
};

const TableHead = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"thead">) => {
  const Comp = asChild ? Slot.Root : "thead";

  return (
    <Comp
      className={cn(
        "table-header-group",
        "group-data-[variant=outline]/table:bg-muted",
        className,
      )}
      {...props}
    />
  );
};

const TableRow = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"tr">) => {
  const Comp = asChild ? Slot.Root : "tr";

  return (
    <Comp
      className={cn(
        "table-row",
        "group-data-[striped=true]/table:odd:[&>td]:bg-muted",
        "group-data-[interactive=true]/table:not-disabled:hover:bg-muted",
        className,
      )}
      {...props}
    />
  );
};

const tableCaptionVariants = tv({
  base: "table-caption, text-xs/4 font-medium",
  variants: {
    side: {
      top: "mb-1 caption-top",
      bottom: "mt-1 caption-bottom",
    },
  },
});

type TableCaptionProps = PrimitivePropsWithRef<"caption"> &
  VariantProps<typeof tableCaptionVariants>;

const TableCaption = ({
  className,
  asChild,
  side,
  ...props
}: TableCaptionProps) => {
  const Comp = asChild ? Slot.Root : "caption";

  return (
    <Comp
      className={tableCaptionVariants({
        className,
        side,
      })}
      {...props}
    />
  );
};

export {
  TableScrollArea,
  Table,
  type TableProps,
  TableBody,
  TableCell,
  TableFooter,
  TableHeader,
  TableHead,
  TableRow,
  TableCaption,
  type TableCaptionProps,
};
