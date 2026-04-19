import { createContext, use, type ReactNode } from "react";

import type { ExifData } from "libexif-wasm";

import { useExifData } from "#hooks/useExifData";
import { ExifEditorStoreContext, useExifEditor } from "#hooks/useExifEditor";
import { useFileStore } from "#hooks/useFileStore";

const ExifEditorContext = createContext<ExifData | null>(null);

const useExifEditorContext = () => {
  const exifEditorContext = use(ExifEditorContext);

  if (exifEditorContext === null) {
    throw new Error("Missing ExifEditorProvider in the tree");
  }
  return exifEditorContext;
};

const ExifEditorProvider = ({
  children,
}: Readonly<{ children: ReactNode }>) => {
  const { file } = useFileStore();
  const exifData = useExifData(file);
  const exifEditorStore = useExifEditor(exifData);

  return (
    <ExifEditorContext value={exifData}>
      <ExifEditorStoreContext value={exifEditorStore}>
        {children}
      </ExifEditorStoreContext>
    </ExifEditorContext>
  );
};

export { ExifEditorContext, ExifEditorProvider, useExifEditorContext };
