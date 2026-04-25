import { dayjs } from "#utils/date";

import type { QuickEditorResolver } from "../types";

const EXIF_DATESTAMP_FORMAT = "YYYY:MM:DD";

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
    return {
      kind: "dateStamp",
      exifEntryObject,
      value: dayjs(exifEntryObject.formattedValue ?? "", EXIF_DATESTAMP_FORMAT),
      onValueChange: (value) =>
        onValueChange(value.format(EXIF_DATESTAMP_FORMAT)),
    };
  }

  return null;
};

export { resolveDateStamp };
