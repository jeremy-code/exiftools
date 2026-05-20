import { CalendarDate } from "@internationalized/date";
import { format } from "date-fns/format";
import { parse } from "date-fns/parse";
import { parseISO } from "date-fns/parseISO";

import { EXIF_DATESTAMP_FORMAT } from "#lib/exif/constants";
import { decodeStringFromUtf8 } from "#utils/decodeStringFromUtf8";
import { encodeStringToUtf8 } from "#utils/encodeStringToUtf8";

import type { AddEditorResolver } from "../types";

const resolveDateStamp: AddEditorResolver = (
  exifEntryObject,
  onValueChange,
) => {
  if (exifEntryObject.tag === "DATE_STAMP") {
    const parsedValue =
      exifEntryObject.value.length === 0 ?
        undefined
      : parse(
          decodeStringFromUtf8(new Uint8Array(exifEntryObject.value)),
          EXIF_DATESTAMP_FORMAT,
          new Date(),
        );
    return {
      kind: "dateStamp",
      exifEntryObject,
      value:
        parsedValue === undefined ? undefined : (
          new CalendarDate(
            parsedValue.getFullYear(),
            parsedValue.getMonth() + 1,
            parsedValue.getDate(),
          )
        ),
      onValueChange: (value) =>
        onValueChange(
          value === undefined ?
            []
          : Array.from(
              encodeStringToUtf8(
                format(parseISO(value.toString()), EXIF_DATESTAMP_FORMAT),
              ),
            ),
        ),
    };
  }

  return null;
};

export { resolveDateStamp };
