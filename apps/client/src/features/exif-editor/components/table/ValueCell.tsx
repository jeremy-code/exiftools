import type { CellContext } from "@tanstack/react-table";
import { ExifTagInfo } from "libexif-wasm";

import { EnumSelect } from "#components/editor/EnumSelect";
import { ExifVersionInput } from "#components/editor/ExifVersionInput";
import { GpsTagVersionInput } from "#components/editor/GpsTagVersionInput";
import type { ExifEntryObject } from "#lib/exif/serializeExifData";
import { assertNever } from "#utils/assertNever";
import { DateField } from "@exifi/ui/components2/DateField";
import { DatePicker } from "@exifi/ui/components2/DatePicker";
import { NumberField } from "@exifi/ui/components2/NumberField";
import { TextField } from "@exifi/ui/components2/TextField";
import { TimeField } from "@exifi/ui/components2/TimeField";

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
  const title = ExifTagInfo.getTitleInIfd(originalRow.tag, originalRow.ifd);
  const label = title !== "" ? title : originalRow.tag;

  switch (quickEditor.kind) {
    case "enum":
    case "enumAscii":
      return (
        <EnumSelect
          aria-label={label}
          placeholder={`Select a value for ${title}`}
          {...quickEditor}
        />
      );
    case "dateStamp":
      return (
        <DateField
          {...quickEditor}
          aria-label={label}
          onChange={(value) => {
            if (value !== null) {
              quickEditor.onValueChange(value);
            }
          }}
        />
      );
    case "versionId":
      return (
        <GpsTagVersionInput
          inputProps={{ "aria-label": label }}
          {...quickEditor}
        />
      );
    case "datetime":
      return (
        <DatePicker
          {...quickEditor}
          aria-label={label}
          granularity="second"
          onChange={(value) => {
            if (value !== null) {
              quickEditor.onValueChange(value);
            }
          }}
        />
      );
    case "timeStamp":
      return (
        <TimeField
          granularity="second"
          {...quickEditor}
          aria-label={label}
          onChange={(value) => {
            if (value !== null) {
              quickEditor.onValueChange(value);
            }
          }}
        />
      );
    case "ascii":
      return (
        <TextField
          aria-label={label}
          {...quickEditor}
          onChange={(value) => quickEditor.onValueChange(value)}
        />
      );
    case "exifVersion":
      return <ExifVersionInput aria-label={label} {...quickEditor} />;
    case "simpleNumeric":
      return (
        <NumberField
          {...quickEditor}
          aria-label={label}
          onChange={(value) => quickEditor.onValueChange(value)}
        />
      );
    default:
      assertNever(quickEditor);
  }
};

export { ValueCell, type ValueCellProps };
