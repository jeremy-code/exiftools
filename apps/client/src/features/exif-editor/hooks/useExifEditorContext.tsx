import { createContext, use } from "react";

import type { ExifData } from "libexif-wasm";

const ExifEditorContext = createContext<ExifData | null>(null);

const useExifEditorContext = () => {
  const exifEditorContext = use(ExifEditorContext);

  if (exifEditorContext === null) {
    throw new Error("Missing ExifEditorProvider in the tree");
  }
  return exifEditorContext;
};

export { ExifEditorContext, useExifEditorContext };
