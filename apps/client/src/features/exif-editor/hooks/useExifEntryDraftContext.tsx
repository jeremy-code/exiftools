import { createContext, use, type Dispatch, type SetStateAction } from "react";

import type { ExifEntryObject } from "#lib/exif/serializeExifData";

type ExifEntryDraft = {
  exifEntryObject: ExifEntryObject;
  draft: number[];
  setDraft: Dispatch<SetStateAction<number[]>>;
};
const ExifEntryDraftContext = createContext<ExifEntryDraft | null>(null);

const useExifEntryDraftContext = () => {
  const context = use(ExifEntryDraftContext);
  if (context === null) {
    throw new Error("Missing ExifEntryDraftContext in the tree");
  }

  return context;
};

export { useExifEntryDraftContext, ExifEntryDraftContext, type ExifEntryDraft };
