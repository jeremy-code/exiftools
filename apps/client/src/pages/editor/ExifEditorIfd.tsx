import { useState } from "react";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
  type CellContext,
  type RowData,
} from "@tanstack/react-table";

import { useExifEditorStateStore } from "#hooks/useExifEditorState";
import type { ExifEntryObject } from "#lib/exif/serializeExifData";
import {
  Table,
  TableHead,
  TableHeader,
  TableRow,
  TableCell,
  TableBody,
  type TableProps,
} from "@exiftools/ui/components/Table";

declare module "@tanstack/react-table" {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars -- All declarations of 'TableMeta' must have identical type parameters.
  interface TableMeta<TData extends RowData> {
    updateExifEntry: (
      columnId: "IFD_0" | "IFD_1" | "EXIF" | "GPS" | "INTEROPERABILITY",
      rowIndex: number,
      value: string,
    ) => void;
  }
}

const ValueCell = ({
  getValue,
  row,
  table,
}: CellContext<ExifEntryObject, string | null>) => {
  const initialValue = getValue();
  const [value, setValue] = useState(initialValue ?? "");

  return (
    <input
      disabled={row.original.format !== "ASCII"}
      value={value}
      onBlur={() => {
        table.options.meta?.updateExifEntry(
          row.original.ifd,
          Number(row.id),
          value,
        );
      }}
      onChange={(e) => {
        setValue(e.target.value);
      }}
    />
  );
};

const columnHelper = createColumnHelper<ExifEntryObject>();
const columns = [
  columnHelper.accessor("tag", { header: "Tag" }),
  columnHelper.accessor("format", { header: "Format" }),
  columnHelper.accessor("value", { header: "Value", cell: ValueCell }),
];

const fallbackData: ExifEntryObject[] = [];

type ExifEditorIfdProps = {
  exifEntryObjects: ExifEntryObject[];
} & TableProps;

const ExifEditorIfd = ({ exifEntryObjects, ...props }: ExifEditorIfdProps) => {
  const updateExifEntry = useExifEditorStateStore(
    (state) => state.updateExifEntry,
  );
  const table = useReactTable({
    columns,
    data: exifEntryObjects ?? fallbackData,
    getCoreRowModel: getCoreRowModel(),
    meta: {
      updateExifEntry,
    },
  });

  return (
    <Table {...props}>
      <TableHead>
        {table.getHeaderGroups().map((headerGroup) => (
          <TableRow key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <TableHeader key={header.id}>
                {!header.isPlaceholder &&
                  flexRender(
                    header.column.columnDef.header,
                    header.getContext(),
                  )}
              </TableHeader>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody>
        {table.getRowModel().rows.map((row) => (
          <TableRow key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <TableCell key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export { ExifEditorIfd, type ExifEditorIfdProps };
