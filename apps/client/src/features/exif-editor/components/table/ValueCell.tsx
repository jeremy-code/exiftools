import type { CellContext } from "@tanstack/react-table";
import { ExifTagInfo } from "libexif-wasm";

import { DateInput } from "#components/editor/DateInput";
import { DatetimeLocalInput } from "#components/editor/DatetimeLocalInput";
import { EnumSelect } from "#components/editor/EnumSelect";
import { ExifVersionInput } from "#components/editor/ExifVersionInput";
import { GpsTagVersionInput } from "#components/editor/GpsTagVersionInput";
import { NumberInput } from "#components/editor/NumberInput";
import { TimeStampInput } from "#components/editor/TimeStampInput";
import type { ExifEntryObject } from "#lib/exif/serializeExifData";
import { assertNever } from "#utils/assertNever";
import { Input } from "@exifi/ui/components/Input";

import type { ExifTableRow } from "./columns";
import { getExifQuickEditor } from "../../editors/quick/getExifQuickEditor";

type ValueCellProps = CellContext<
  ExifTableRow,
  ExifEntryObject["formattedValue"]
>;

const ValueCell = ({ row, getValue, table }: ValueCellProps) => {
  const originalRow = row.original;

  if ("entries" in originalRow) {
    return null;
  }

  const quickEditor = getExifQuickEditor(originalRow, (value) =>
    table.options.meta?.updateExifEntry(originalRow, value),
  );

  if (quickEditor === null) {
    return getValue() ?? "";
  }
  const className = "focus:border-border focus:bg-background";

  switch (quickEditor.kind) {
    case "enum":
    case "enumAscii":
      return (
        <EnumSelect
          placeholder={`Select a value for ${ExifTagInfo.getTitleInIfd(originalRow.tag, originalRow.ifd)}`}
          {...quickEditor}
        />
      );
    case "dateStamp":
      return <DateInput className={className} {...quickEditor} />;
    case "versionId":
      return <GpsTagVersionInput className={className} {...quickEditor} />;
    case "datetime":
      return <DatetimeLocalInput className={className} {...quickEditor} />;
    case "timeStamp":
      return <TimeStampInput className={className} {...quickEditor} />;
    case "ascii":
      return (
        <Input
          className={className}
          type="text"
          {...quickEditor}
          onChange={(e) => quickEditor.onValueChange(e.target.value)}
        />
      );
    case "exifVersion":
      return <ExifVersionInput className={className} {...quickEditor} />;
    case "simpleNumeric":
      return <NumberInput className={className} {...quickEditor} />;
    default:
      assertNever(quickEditor);
  }
};

export { ValueCell, type ValueCellProps };
