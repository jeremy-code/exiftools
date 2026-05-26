import { useCallback, useMemo, useState } from "react";

import { newTypedArrayInFormat } from "#lib/exif/newTypedArrayInFormat";
import type { ExifEntryObject } from "#lib/exif/serializeExifData";
import { arrayLikeEquals } from "#utils/arrayLikeEquals";

import { useExifEditor } from "../contexts/ExifEditorContext";

const useExifEntryDraft = (exifEntryObject: ExifEntryObject) => {
  const updateExifEntry = useExifEditor((s) => s.updateExifEntry);
  const [draft, setDraft] = useState(exifEntryObject.value);

  const isChanged = useMemo(
    () => !arrayLikeEquals(exifEntryObject.value, draft),
    [exifEntryObject.value, draft],
  );

  const save = useCallback(() => {
    updateExifEntry(
      exifEntryObject,
      newTypedArrayInFormat(draft, exifEntryObject.format),
    );
  }, [draft, exifEntryObject, updateExifEntry]);

  return { draft, setDraft, isChanged, save };
};

export { useExifEntryDraft };
