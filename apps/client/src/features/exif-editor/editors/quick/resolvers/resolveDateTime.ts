import { dayjs } from "#utils/date";

import type { QuickEditorResolver } from "../types";

// https://github.com/libexif/libexif/blob/b9b7f3c08c1b6812ad3b9d62227ad9527ab9385a/libexif/exif-entry.c#L1718
const DATETIME_TAGS = [
  "DATE_TIME",
  "DATE_TIME_ORIGINAL",
  "DATE_TIME_DIGITIZED",
];

const EXIF_TIMESTAMP_FORMAT = "YYYY:MM:DD HH:mm:ss";

const resolveDateTime: QuickEditorResolver = (
  exifEntryObject,
  onValueChange,
) => {
  if (
    DATETIME_TAGS.includes(exifEntryObject.tag) &&
    exifEntryObject.components === EXIF_TIMESTAMP_FORMAT.length + 1 &&
    exifEntryObject.size === EXIF_TIMESTAMP_FORMAT.length + 1
  ) {
    return {
      kind: "datetime",
      exifEntryObject,
      value: dayjs(exifEntryObject.formattedValue ?? "", EXIF_TIMESTAMP_FORMAT),
      onValueChange: (value) =>
        onValueChange(value.format(EXIF_TIMESTAMP_FORMAT)),
    };
  }

  return null;
};

export { resolveDateTime };
