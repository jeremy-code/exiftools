import { EXIF_TAG_MAP } from "#lib/exif/exifTagMap";
import { newTypedArrayInFormat } from "#lib/exif/newTypedArrayInFormat";

import type { QuickEditorResolver } from "../types";

const resolveEnum: QuickEditorResolver = (entry, onValueChange) => {
  const mappedTag = EXIF_TAG_MAP[entry.tag];

  if (
    mappedTag === undefined ||
    entry.components !== 1 ||
    mappedTag.values === undefined ||
    entry.formattedValue === null ||
    !(entry.formattedValue in mappedTag.values)
  ) {
    return null;
  }

  const values = mappedTag.values;

  return {
    kind: "enum",
    exifEntryObject: entry,
    value: entry.formattedValue,
    values: Object.keys(values),
    onValueChange: (value) => {
      const next = values[value];
      if (next !== undefined) {
        onValueChange(newTypedArrayInFormat([next], entry.format));
      }
    },
  };
};

export { resolveEnum };
