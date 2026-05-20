import type { AddEditorResolver } from "../types";

const resolveVersionId: AddEditorResolver = (
  exifEntryObject,
  onValueChange,
) => {
  if (
    exifEntryObject.tag === "VERSION_ID" &&
    exifEntryObject.value.length <= 4
  ) {
    return {
      kind: "versionId",
      exifEntryObject,
      value: exifEntryObject.value,
      onValueChange: (value) => onValueChange(value),
    };
  }

  return null;
};

export { resolveVersionId };
