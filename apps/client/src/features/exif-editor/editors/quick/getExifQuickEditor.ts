import { resolveAscii } from "./resolvers/resolveAscii";
import { resolveDateStamp } from "./resolvers/resolveDateStamp";
import { resolveDateTime } from "./resolvers/resolveDateTime";
import { resolveEnum } from "./resolvers/resolveEnum";
import { resolveEnumAscii } from "./resolvers/resolveEnumAscii";
import { resolveExifVersion } from "./resolvers/resolveExifVersion";
import { resolveSimpleNumeric } from "./resolvers/resolveSimpleNumeric";
import { resolveSimpleRational } from "./resolvers/resolveSimpleRational";
import { resolveTimeStamp } from "./resolvers/resolveTimeStamp";
import { resolveVerisonId } from "./resolvers/resolveVersionId";
import type { QuickEditorResolver } from "./types";

const resolvers: QuickEditorResolver[] = [
  resolveEnum, // Based on EXIF_TAG_MAP
  resolveEnumAscii,
  resolveDateStamp, // tag === "DATE_STAMP"
  resolveDateTime, // tag === "DATE_TIME"
  resolveExifVersion, // tag === "EXIF_VERSION"
  resolveVerisonId, // tag === "VERSION_ID"
  resolveTimeStamp, // tag === "TIME_STAMP"
  resolveAscii, // format === "ASCII"
  resolveSimpleRational, // format === "RATIONAL" && denominator === 1
  resolveSimpleNumeric, // format is numeric && components === 1
];

const getExifQuickEditor: QuickEditorResolver = (
  exifEntryObject,
  onValueChange,
) => {
  for (const resolver of resolvers) {
    const result = resolver(exifEntryObject, onValueChange);
    if (result !== null) {
      return result;
    }
  }
  return null;
};

export { getExifQuickEditor };
