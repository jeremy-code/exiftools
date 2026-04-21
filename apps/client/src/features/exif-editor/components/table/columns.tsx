import { createColumnHelper } from "@tanstack/react-table";
import { ExifTagInfo, type Ifd } from "libexif-wasm";

import type { ExifEntryObject } from "#lib/exif/serializeExifData";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@exiftools/ui/components/Tooltip";

import { IfdCell } from "./IfdCell";
import { SelectCell } from "./SelectCell";
import { SelectHeader } from "./SelectHeader";
import { ValueCell } from "./ValueCell";
import { EditEntryDialog } from "../dialogs/EditEntryDialog";

type ExifTableRow =
  | ExifEntryObject
  | {
      ifd: Ifd;
      entries: ExifTableRow[];
    };

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
    cell: ({ row }) =>
      "entries" in row.original ?
        null
      : <Tooltip>
          <TooltipTrigger className="text-left">
            {ExifTagInfo.getTitleInIfd(row.original.tag, row.original.ifd)}
          </TooltipTrigger>
          <TooltipContent>
            {ExifTagInfo.getDescriptionInIfd(
              row.original.tag,
              row.original.ifd,
            )}
          </TooltipContent>
        </Tooltip>,
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
