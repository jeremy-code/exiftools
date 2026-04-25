import type { QuickEditorResolver } from "../types";

const resolveExifVersion: QuickEditorResolver = (
  exifEntryObject,
  onValueChange,
) => {
  if (
    exifEntryObject.tag === "EXIF_VERSION" &&
    exifEntryObject.size === 4 &&
    exifEntryObject.components === 4
  ) {
    return {
      kind: "exifVersion",
      exifEntryObject,
      value: exifEntryObject.value,
      onValueChange: (value) => onValueChange(new Uint8Array(value)),
    };
  }

  return null;
};

export { resolveExifVersion };
