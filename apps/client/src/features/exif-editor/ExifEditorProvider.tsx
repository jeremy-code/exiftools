import { type ReactNode } from "react";

import {
  ExifEditorStoreContext,
  useExifEditor,
} from "#features/exif-editor/hooks/useExifEditor";
import { useExifData } from "#hooks/useExifData";
import { useFileStore } from "#hooks/useFileStore";

import { ExifEditorContext } from "./hooks/useExifEditorContext";

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

export { ExifEditorProvider };
