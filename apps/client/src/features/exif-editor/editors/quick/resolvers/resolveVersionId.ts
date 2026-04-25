import type { QuickEditorResolver } from "../types";

const resolveVerisonId: QuickEditorResolver = (
  exifEntryObject,
  onValueChange,
) => {
  if (
    exifEntryObject.tag === "VERSION_ID" &&
    exifEntryObject.size === 4 &&
    exifEntryObject.components === 4
  ) {
    return {
      kind: "versionId",
      exifEntryObject,
      value: exifEntryObject.value,
      onValueChange: (value) => onValueChange(new Uint8Array(value)),
    };
  }

  return null;
};

export { resolveVerisonId };
