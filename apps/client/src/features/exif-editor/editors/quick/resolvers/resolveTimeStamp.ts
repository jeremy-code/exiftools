import {
  exifFormatGetSize,
  mapRationalFromObject,
  mapRationalToObject,
} from "libexif-wasm";

import { newTypedArrayInFormat } from "#lib/exif/newTypedArrayInFormat";

import type { QuickEditorResolver } from "../types";

const resolveTimeStamp: QuickEditorResolver = (
  exifEntryObject,
  onValueChange,
) => {
  if (
    exifEntryObject.tag === "TIME_STAMP" &&
    exifEntryObject.ifd === "GPS" &&
    exifEntryObject.format === "RATIONAL" &&
    // hours, minutes, seconds
    exifEntryObject.components === 3 &&
    exifEntryObject.size === exifFormatGetSize("RATIONAL") * 3
  ) {
    return {
      kind: "timeStamp",
      exifEntryObject,
      value: mapRationalToObject(
        newTypedArrayInFormat(exifEntryObject.value, "RATIONAL"),
      ),
      onValueChange: (value) =>
        onValueChange(mapRationalFromObject(value, "RATIONAL")),
    };
  }

  return null;
};

export { resolveTimeStamp };
