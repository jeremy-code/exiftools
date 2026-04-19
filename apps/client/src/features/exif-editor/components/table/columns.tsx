import { createColumnHelper } from "@tanstack/react-table";
import { exifIfdGetName, ExifTagInfo } from "libexif-wasm";

import type { ExifEntryObject } from "#lib/exif/serializeExifData";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@exiftools/ui/components/Tooltip";

import { SelectCell } from "./SelectCell";
import { SelectHeader } from "./SelectHeader";
import { ValueCell } from "./ValueCell";
import { EditEntryDialog } from "../dialogs/EditEntryDialog";

const columnHelper = createColumnHelper<ExifEntryObject>();

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
    cell: ({ getValue }) => exifIfdGetName(getValue()),
    header: "IFD",
    size: 30,
  }),
  columnHelper.accessor("tag", {
    id: "tag",
    header: "Tag",
    size: 70,
    cell: ({ getValue, row }) => (
      <Tooltip>
        <TooltipTrigger className="text-left">
          {ExifTagInfo.getTitleInIfd(getValue(), row.original.ifd)}
        </TooltipTrigger>
        <TooltipContent>
          {ExifTagInfo.getDescriptionInIfd(getValue(), row.original.ifd)}
        </TooltipContent>
      </Tooltip>
    ),
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

export { columns };
