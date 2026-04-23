import { createColumnHelper } from "@tanstack/react-table";
import type { Ifd } from "libexif-wasm";

import type { ExifEntryObject } from "#lib/exif/serializeExifData";

import { IfdCell } from "./IfdCell";
import { SelectCell } from "./SelectCell";
import { SelectHeader } from "./SelectHeader";
import { TagCell } from "./TagCell";
import { ValueCell } from "./ValueCell";
import { EditEntryDialog } from "../dialogs/EditEntryDialog";

type ExifTableRow = ExifEntryObject | { ifd: Ifd; entries: ExifTableRow[] };

const columnHelper = createColumnHelper<ExifTableRow>();

const columns = [
  columnHelper.display({
    id: "select",
    aggregatedCell: SelectCell,
    cell: SelectCell,
    header: SelectHeader,
    size: 24,
  }),
  columnHelper.accessor("ifd", {
    id: "ifd",
    aggregatedCell: IfdCell,
    cell: IfdCell,
    header: "IFD",
    size: 30,
  }),
  columnHelper.accessor("tag", {
    id: "tag",
    header: "Tag",
    size: 70,
    cell: TagCell,
  }),
  columnHelper.accessor("formattedValue", {
    header: "Value",
    cell: ValueCell,
    size: 90,
  }),
  columnHelper.display({
    id: "edit",
    cell: EditEntryDialog,
    size: 35,
  }),
];

export { type ExifTableRow, columns };
