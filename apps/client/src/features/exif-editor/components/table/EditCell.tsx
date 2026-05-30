import type { CellContext } from "@tanstack/react-table";

import type { ExifTableRow } from "./columns";
import { EditEntryDialog } from "../dialogs/EditEntryDialog";

type EditEntryCellProps = CellContext<ExifTableRow, unknown>;

const EditCell = ({ row }: EditEntryCellProps) => {
  if ("entries" in row.original) {
    return null;
  }

  return <EditEntryDialog exifEntryObject={row.original} />;
};

export { EditCell };
