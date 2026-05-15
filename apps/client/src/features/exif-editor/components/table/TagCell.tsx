import type { CellContext } from "@tanstack/react-table";
import { ExifTagInfo } from "libexif-wasm";

import {
  Tooltip,
  TooltipTrigger,
  TooltipTarget,
} from "@exifi/ui/components/Tooltip";

import type { ExifTableRow } from "./columns";

type TagCellProps = CellContext<ExifTableRow, unknown>;

const TagCell = ({ row }: TagCellProps) => {
  if ("entries" in row.original) {
    return null;
  }

  return (
    <TooltipTrigger>
      <TooltipTarget>
        <span role="button">
          {ExifTagInfo.getTitleInIfd(row.original.tag, row.original.ifd)}
        </span>
      </TooltipTarget>
      <Tooltip>
        {ExifTagInfo.getDescriptionInIfd(row.original.tag, row.original.ifd)}
      </Tooltip>
    </TooltipTrigger>
  );
};

export { TagCell, type TagCellProps };
