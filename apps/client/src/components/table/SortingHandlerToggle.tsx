import type { ComponentPropsWithRef } from "react";

import type { Column, RowData } from "@tanstack/react-table";
import { ArrowDownWideNarrow, ArrowUpNarrowWide } from "lucide-react";
import { cn } from "tailwind-variants";

type SortingHandlerToggle<TData extends RowData, TValue> = {
  column: Column<TData, TValue>;
} & ComponentPropsWithRef<"button">;

const SortingHandlerToggle = <TData extends RowData, TValue>({
  column,
  children,
  className,
  ...props
}: SortingHandlerToggle<TData, TValue>) => {
  // eslint-disable-next-line react-compiler/react-compiler -- TanStack Table is not compatible with React compiler
  "use no memo";

  return (
    <button
      className={cn("flex cursor-pointer items-center gap-2", className)}
      onClick={column.getToggleSortingHandler()}
      {...props}
    >
      {children}
      {column.getIsSorted() === "asc" ?
        <ArrowDownWideNarrow size={16} />
      : column.getIsSorted() === "desc" ?
        <ArrowUpNarrowWide size={16} />
      : null}
    </button>
  );
};

export { SortingHandlerToggle };
