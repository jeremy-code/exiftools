import { mapRationalToObject } from "libexif-wasm";

import { typedArrayInFormat } from "#lib/exif/typedArrayInFormat";

import type { AdvancedEditorResolver } from "../types";

const resolveRational: AdvancedEditorResolver = (
  exifEntryObject,
  onValueChange,
) => {
  if (
    exifEntryObject.format === "RATIONAL" ||
    exifEntryObject.format === "SRATIONAL"
  ) {
    return {
      kind: "rational",
      exifEntryObject,
      values: mapRationalToObject(
        typedArrayInFormat(exifEntryObject.value, exifEntryObject.format),
      ),
      onValueChange: (rationalObject, index) => {
        onValueChange(
          exifEntryObject.value.toSpliced(
            index * 2,
            2,
            rationalObject.numerator,
            rationalObject.denominator,
          ),
        );
      },
    };
  }
  return null;
};

export { resolveRational };
