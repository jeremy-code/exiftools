import type { QuickEditorResolver } from "../types";

const resolveAscii: QuickEditorResolver = (exifEntryObject, onValueChange) => {
  if (exifEntryObject.format === "ASCII") {
    return {
      kind: "ascii",
      exifEntryObject,
      value: exifEntryObject.formattedValue ?? "",
      onValueChange,
    };
  }

  return null;
};

export { resolveAscii };
