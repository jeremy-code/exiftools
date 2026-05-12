import { CalendarDate } from "@internationalized/date";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";

import type { QuickEditorResolver } from "../types";

const EXIF_DATESTAMP_FORMAT = "yyyy:MM:dd";

const resolveDateStamp: QuickEditorResolver = (
  exifEntryObject,
  onValueChange,
) => {
  if (
    exifEntryObject.tag === "DATE_STAMP" &&
    // Including null terminator
    exifEntryObject.components === EXIF_DATESTAMP_FORMAT.length + 1 &&
    exifEntryObject.size === EXIF_DATESTAMP_FORMAT.length + 1
  ) {
    const parsedValue = parse(
      exifEntryObject.formattedValue ?? "",
      EXIF_DATESTAMP_FORMAT,
      new Date(),
    );

    return {
      kind: "dateStamp",
      exifEntryObject,
      value: new CalendarDate(
        parsedValue.getFullYear(),
        parsedValue.getMonth() + 1,
        parsedValue.getDate(),
      ),
      onValueChange: (value) =>
        onValueChange(format(value.toString(), EXIF_DATESTAMP_FORMAT)),
    };
  }

  return null;
};

export { resolveDateStamp };
