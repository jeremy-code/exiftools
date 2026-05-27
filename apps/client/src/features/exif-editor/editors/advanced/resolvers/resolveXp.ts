import { XP_TAGS } from "#lib/exif/xp/constants";
import { formatXp } from "#lib/exif/xp/formatXp";
import { parseXp } from "#lib/exif/xp/parseXp";

import type { AdvancedEditorResolver } from "../types";

const resolveXp: AdvancedEditorResolver = (exifEntryObject, onValueChange) => {
  if (
    exifEntryObject.format === "BYTE" &&
    XP_TAGS.includes(exifEntryObject.tag)
  ) {
    return {
      kind: "xp",
      exifEntryObject,
      value: parseXp(new Uint8Array(exifEntryObject.value)),
      onValueChange: (value) => onValueChange(Array.from(formatXp(value))),
    };
  }

  return null;
};

export { resolveXp };
