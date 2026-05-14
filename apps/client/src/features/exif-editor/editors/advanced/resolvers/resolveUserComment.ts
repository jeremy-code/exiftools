import { formatUserComment } from "#lib/exif/userComment/formatUserComment";
import { parseUserComment } from "#lib/exif/userComment/parseUserComment";

import type { AdvancedEditorResolver } from "../types";

const resolveUserComment: AdvancedEditorResolver = (
  exifEntryObject,
  value,
  onValueChange,
) => {
  if (exifEntryObject.tag === "USER_COMMENT") {
    return {
      kind: "userComment",
      exifEntryObject,
      value: parseUserComment(value),
      onValueChange: (value) =>
        onValueChange(Array.from(formatUserComment(value))),
    };
  }

  return null;
};

export { resolveUserComment };
