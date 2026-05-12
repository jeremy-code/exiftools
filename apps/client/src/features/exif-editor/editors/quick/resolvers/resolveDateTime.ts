import { CalendarDateTime } from "@internationalized/date";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";

import type { QuickEditorResolver } from "../types";

const EXIF_TIMESTAMP_FORMAT = "yyyy:MM:dd HH:mm:ss";

// https://github.com/libexif/libexif/blob/b9b7f3c08c1b6812ad3b9d62227ad9527ab9385a/libexif/exif-entry.c#L1718
const DATETIME_TAGS = [
  "DATE_TIME",
  "DATE_TIME_ORIGINAL",
  "DATE_TIME_DIGITIZED",
];

const resolveDateTime: QuickEditorResolver = (
  exifEntryObject,
  onValueChange,
) => {
  if (
    DATETIME_TAGS.includes(exifEntryObject.tag) &&
    exifEntryObject.components === EXIF_TIMESTAMP_FORMAT.length + 1 &&
    exifEntryObject.size === EXIF_TIMESTAMP_FORMAT.length + 1
  ) {
    const parsedValue = parse(
      exifEntryObject.formattedValue ?? "",
      EXIF_TIMESTAMP_FORMAT,
      new Date(),
    );

    return {
      kind: "datetime",
      exifEntryObject,
      value: new CalendarDateTime(
        parsedValue.getFullYear(),
        parsedValue.getMonth() + 1,
        parsedValue.getDate(),
        parsedValue.getHours(),
        parsedValue.getMinutes(),
        parsedValue.getSeconds(),
      ),
      onValueChange: (value) =>
        onValueChange(format(value.toString(), EXIF_TIMESTAMP_FORMAT)),
    };
  }

  return null;
};

export { resolveDateTime };
