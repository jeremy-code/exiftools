import { ExifInformation } from "#components/file/ExifInformation";

import { ExifTable } from "./components/ExifTable";
import { ExifToolbar } from "./components/ExifToolbar";
import { useExifEditor, ExifEditorContext } from "./hooks/useExifEditor";

const ExifEditorContent = ({ file }: { file: File }) => {
  const exifEditor = useExifEditor(file);

  return (
    <ExifEditorContext value={exifEditor}>
      <ExifInformation exifData={exifEditor.exifData} />
      <ExifToolbar />
      <ExifTable />
    </ExifEditorContext>
  );
};

export { ExifEditorContent };
