import { ExifInformation } from "#components/file/ExifInformation";
import { useExifData } from "#hooks/useExifData";

import { ExifTable } from "./components/ExifTable";
import { ExifToolbar } from "./components/ExifToolbar";
import { ExifEditorProvider } from "./contexts/ExifEditorContext";

const ExifEditorContent = ({ file }: { file: File }) => {
  const exifData = useExifData(file);

  return (
    <ExifEditorProvider exifData={exifData}>
      <ExifInformation exifData={exifData} />
      <ExifToolbar />
      <ExifTable />
    </ExifEditorProvider>
  );
};

export { ExifEditorContent };
