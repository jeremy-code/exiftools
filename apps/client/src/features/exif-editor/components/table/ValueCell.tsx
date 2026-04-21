import type { CellContext } from "@tanstack/react-table";

import { DateInput } from "#components/editor/DateInput";
import { DatetimeLocalInput } from "#components/editor/DatetimeLocalInput";
import { ExifVersionInput } from "#components/editor/ExifVersionInput";
import { GpsTagVersionInput } from "#components/editor/GpsTagVersionInput";
import { NumberInput } from "#components/editor/NumberInput";
import { EXIF_TAG_MAP } from "#lib/exif/exifTagMap";
import { newTypedArrayInFormat } from "#lib/exif/newTypedArrayInFormat";
import type { ExifEntryObject } from "#lib/exif/serializeExifData";
import { dayjs } from "#utils/date";
import { Input } from "@exiftools/ui/components/Input";

import { EnumValueCell } from "./EnumValueCell";
import type { ExifTableRow } from "./columns";

type ValueCellProps = CellContext<
  ExifTableRow,
  ExifEntryObject["formattedValue"]
>;

const EXIF_TIMESTAMP_FORMAT = "YYYY:MM:DD HH:mm:ss";

// https://github.com/libexif/libexif/blob/b9b7f3c08c1b6812ad3b9d62227ad9527ab9385a/libexif/exif-entry.c#L1718
const DATETIME_TAGS = [
  "DATE_TIME",
  "DATE_TIME_ORIGINAL",
  "DATE_TIME_DIGITIZED",
];

const ValueCell = ({ getValue, row, table }: ValueCellProps) => {
  const originalRow = row.original;

  if ("entries" in originalRow) {
    return null;
  }

  const value = getValue() ?? "";
  const isAscii = originalRow.format === "ASCII";
  const isDateTime = DATETIME_TAGS.includes(originalRow.tag);
  const isInTagMap =
    originalRow.tag in EXIF_TAG_MAP &&
    EXIF_TAG_MAP[originalRow.tag] !== undefined;
  const isEnum =
    isInTagMap &&
    originalRow.components === 1 &&
    EXIF_TAG_MAP[originalRow.tag]?.values !== undefined &&
    value in EXIF_TAG_MAP[originalRow.tag]!.values!;

  if (isEnum) {
    return (
      <EnumValueCell
        exifEntryObject={originalRow}
        value={value}
        updateExifEntry={table.options.meta!.updateExifEntry}
      />
    );
  }

  if (originalRow.tag === "DATE_STAMP") {
    return (
      <DateInput
        className="focus:border-border focus:bg-background"
        value={dayjs(value, "YYYY:MM:DD")}
        onValueChange={(date) => {
          table.options.meta?.updateExifEntry(
            originalRow,
            date.format("YYYY:MM:DD"),
          );
        }}
      />
    );
  } else if (originalRow.tag === "VERSION_ID") {
    return (
      <GpsTagVersionInput
        value={originalRow.value}
        setValue={(value) =>
          table.options.meta?.updateExifEntry(
            originalRow,
            new Uint8Array(value),
          )
        }
        altText={value}
        inputProps={{ className: "focus:border-border focus:bg-background" }}
      />
    );
  }

  if (isDateTime) {
    return (
      <DatetimeLocalInput
        className="focus:border-border focus:bg-background"
        value={dayjs(value, EXIF_TIMESTAMP_FORMAT)}
        onValueChange={(datetimeLocal) => {
          table.options.meta?.updateExifEntry(
            originalRow,
            datetimeLocal.format(EXIF_TIMESTAMP_FORMAT),
          );
        }}
      />
    );
  }

  // All DateTime inputs are also ASCII format, so this is fine
  if (isAscii) {
    return (
      <Input
        className="focus:border-border focus:bg-background"
        type="text"
        value={value}
        onChange={(e) => {
          table.options.meta?.updateExifEntry(originalRow, e.target.value);
        }}
      />
    );
  }

  if (originalRow.tag === "EXIF_VERSION") {
    return (
      <ExifVersionInput
        value={new Uint8Array(originalRow.value)}
        setValue={(value) =>
          table.options.meta?.updateExifEntry(originalRow, value)
        }
        altText={value}
        inputProps={{ className: "focus:border-border focus:bg-background" }}
      />
    );
  }

  if (
    originalRow.components === 1 &&
    (originalRow.format === "SRATIONAL" || originalRow.format === "RATIONAL") &&
    originalRow.value[1] === 1
  ) {
    return (
      <NumberInput
        value={originalRow.value[0]!}
        setValue={(value) => {
          table.options.meta?.updateExifEntry(
            originalRow,
            newTypedArrayInFormat([value, 1], originalRow.format),
          );
        }}
      />
    );
  }

  if (
    originalRow.components === 1 &&
    originalRow.format !== "SRATIONAL" &&
    originalRow.format !== "RATIONAL"
  ) {
    return (
      <NumberInput
        value={originalRow.value[0]!}
        setValue={(value) => {
          table.options.meta?.updateExifEntry(
            originalRow,
            newTypedArrayInFormat([value], originalRow.format),
          );
        }}
      />
    );
  }

  // Return as is. Ideally I would like to have a way to quick edit these in the
  // future, but for now, users can rely on ExifEntryEditor
  return value;
};

export { ValueCell, type ValueCellProps };
