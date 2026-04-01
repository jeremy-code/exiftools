import type { CellContext } from "@tanstack/react-table";

import type { ExifEntryObject } from "#lib/exif/serializeExifData";

type ValueCellProps = CellContext<
  ExifEntryObject,
  ExifEntryObject["formattedValue"]
>;

const ValueCell = ({ getValue, row, table }: ValueCellProps) => {
  const value = getValue() ?? "";

  return (
    <input
      className="border border-transparent focus:border-border focus:bg-background focus:outline-none"
      disabled={row.original.format !== "ASCII"}
      value={value}
      onChange={(e) => {
        table.options.meta?.updateExifEntry(row.original, e.target.value);
      }}
    />
  );
};

export { ValueCell, type ValueCellProps };
