import type { CellContext } from "@tanstack/react-table";
import { Trash2 } from "lucide-react";

import type { ExifEntryObject } from "#lib/exif/serializeExifData";
import { Button } from "@exifi/ui/components2/Button";

type DeleteCellProps = CellContext<ExifEntryObject, unknown>;

const DeleteCell = ({ row, table }: DeleteCellProps) => {
  return (
    <Button
      size="icon"
      onPress={() => {
        table.options.meta?.removeExifEntry(row.original);
      }}
      aria-label="Delete"
    >
      <Trash2 size="16" />
    </Button>
  );
};

export { DeleteCell, type DeleteCellProps };
