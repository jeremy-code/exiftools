import { EXIF_DATESTAMP_REGEX } from "#lib/exif/date/constants";
import { formatExifDateStamp } from "#lib/exif/date/dateStamp/formatExifDateStamp";
import { parseExifDateStamp } from "#lib/exif/date/dateStamp/parseExifDateStamp";

import type { QuickEditorResolver } from "../types";

const resolveDateStamp: QuickEditorResolver = (
  exifEntryObject,
  onValueChange,
) => {
  if (
    exifEntryObject.tag === "DATE_STAMP" &&
    EXIF_DATESTAMP_REGEX.test(exifEntryObject.formattedValue ?? "")
  ) {
    return {
      kind: "dateStamp",
      exifEntryObject,
      value: parseExifDateStamp(exifEntryObject.formattedValue ?? ""),
      onValueChange: (value) => onValueChange(formatExifDateStamp(value)),
    };
  }

  return null;
};

export { resolveDateStamp };
