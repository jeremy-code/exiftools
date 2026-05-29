import type { CellContext } from "@tanstack/react-table";
import type { TagEntry } from "libexif-wasm";

import {
  Tooltip,
  TooltipTarget,
  TooltipTrigger,
} from "@exifi/ui/components/Tooltip";

const NameCell = ({ getValue, row }: CellContext<TagEntry, string>) => {
  const value = getValue();
  const name = value !== "" ? value : row.original.name;

  if (row.original.description === "") {
    return name;
  }

  return (
    <TooltipTrigger>
      <TooltipTarget>
        <span role="button">{name}</span>
      </TooltipTarget>
      <Tooltip>{row.original.description}</Tooltip>
    </TooltipTrigger>
  );
};

export { NameCell };
