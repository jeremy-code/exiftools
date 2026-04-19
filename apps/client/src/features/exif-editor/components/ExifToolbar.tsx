import { Save } from "lucide-react";
import { useShallow } from "zustand/react/shallow";

import { useExifEditorStoreContext } from "#hooks/useExifEditor";
import { useFileStore } from "#hooks/useFileStore";
import { saveFile } from "#utils/saveFile";
import { Button } from "@exiftools/ui/components/Button";
import { writeExifData } from "@exiftools/write-exif-data";

import { useExifEditorContext } from "../ExifEditorProvider";

const ExifToolbar = () => {
  const { file, setFile } = useFileStore();
  const exifData = useExifEditorContext();
  const [fix, addImageDimensions] = useExifEditorStoreContext(
    useShallow((state) => [state.fix, state.addImageDimensions]),
  );

  return (
    <div className="flex flex-wrap gap-2">
      <Button
        onClick={async () => {
          // https://react.dev/reference/react/useTransition#react-doesnt-treat-my-state-update-after-await-as-a-transition
          const newFileInBytes = writeExifData(
            await file.bytes(),
            exifData.saveData(),
          );
          const newFile = new File(
            [new Uint8Array(newFileInBytes)],
            file.name,
            { type: file.type, lastModified: new Date().getTime() },
          );
          await saveFile(newFile);
          setFile(newFile);
        }}
      >
        <Save size={16} />
        Save
      </Button>
      <Button onClick={() => fix()}>Fix</Button>
      <Button onClick={() => addImageDimensions(file)}>
        Add image dimensions
      </Button>
    </div>
  );
};

export { ExifToolbar };
