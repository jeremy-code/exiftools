import { CalendarDate } from "@internationalized/date";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { parseISO } from "date-fns/parseISO";

import { EXIF_DATESTAMP_FORMAT } from "#lib/exif/constants";

import type { QuickEditorResolver } from "../types";

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
        onValueChange(
          format(parseISO(value.toString()), EXIF_DATESTAMP_FORMAT),
        ),
    };
  }

  return null;
};

export { resolveDateStamp };
