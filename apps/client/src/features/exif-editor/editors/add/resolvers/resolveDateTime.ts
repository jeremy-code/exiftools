import { CalendarDateTime } from "@internationalized/date";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { parseISO } from "date-fns/parseISO";

import { EXIF_TIMESTAMP_FORMAT } from "#lib/exif/constants";
import { decodeStringFromUtf8 } from "#utils/decodeStringFromUtf8";
import { encodeStringToUtf8 } from "#utils/encodeStringToUtf8";

import type { AddEditorResolver } from "../types";

// https://github.com/libexif/libexif/blob/b9b7f3c08c1b6812ad3b9d62227ad9527ab9385a/libexif/exif-entry.c#L1718
const DATETIME_TAGS = [
  "DATE_TIME",
  "DATE_TIME_ORIGINAL",
  "DATE_TIME_DIGITIZED",
];

const resolveDateTime: AddEditorResolver = (exifEntryObject, onValueChange) => {
  if (
    exifEntryObject.tag !== undefined &&
    DATETIME_TAGS.includes(exifEntryObject.tag)
  ) {
    const parsedValue =
      exifEntryObject.value.length === 0 ?
        undefined
      : parse(
          decodeStringFromUtf8(new Uint8Array(exifEntryObject.value)),
          EXIF_TIMESTAMP_FORMAT,
          new Date(),
        );

    return {
      kind: "datetime",
      exifEntryObject,
      value:
        parsedValue !== undefined ?
          new CalendarDateTime(
            parsedValue.getFullYear(),
            parsedValue.getMonth() + 1,
            parsedValue.getDate(),
            parsedValue.getHours(),
            parsedValue.getMinutes(),
            parsedValue.getSeconds(),
          )
        : undefined,
      onValueChange: (value) =>
        onValueChange(
          Array.from(
            value === undefined ?
              []
            : encodeStringToUtf8(
                format(parseISO(value.toString()), EXIF_TIMESTAMP_FORMAT),
              ),
          ),
        ),
    };
  }

  return null;
};

export { resolveDateTime };
