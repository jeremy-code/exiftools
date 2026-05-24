import { DATETIME_TAGS, EXIF_DATETIME_REGEX } from "#lib/exif/date/constants";
import { formatExifDateTime } from "#lib/exif/date/dateTime/formatExifDateTime";
import { parseExifDateTime } from "#lib/exif/date/dateTime/parseExifDateTime";

import type { QuickEditorResolver } from "../types";

const resolveDateTime: QuickEditorResolver = (
  exifEntryObject,
  onValueChange,
) => {
  if (
    DATETIME_TAGS.includes(exifEntryObject.tag) &&
    EXIF_DATETIME_REGEX.test(exifEntryObject.formattedValue ?? "")
  ) {
    return {
      kind: "datetime",
      exifEntryObject,
      value: parseExifDateTime(exifEntryObject.formattedValue ?? ""),
      onValueChange: (value) => onValueChange(formatExifDateTime(value)),
    };
  }

  return null;
};

export { resolveDateTime };
