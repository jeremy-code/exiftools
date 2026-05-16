import { Save } from "lucide-react";

import { useFileStore } from "#hooks/useFileStore";
import { saveFile } from "#utils/saveFile";
import { writeExifData } from "@exifi/exif-utils";
import { Button } from "@exifi/ui/components/Button";
import { Toolbar, type ToolbarProps } from "@exifi/ui/components/Toolbar";

import { ExifMenu } from "./ExifMenu";
import { useExifEditorContext } from "../hooks/useExifEditorContext";
import { AddEntryDialog } from "./dialogs/AddEntryDialog";
import { AddGpsEntriesDialog } from "./dialogs/AddGpsEntriesDialog";

// https://evilmartians.com/chronicles/how-to-detect-safari-and-ios-versions-with-ease
const isMobileWebKit = () => "ongesturechange" in window;

type ExifToolbarProps = Omit<ToolbarProps, "children">;

const ExifToolbar = (props: ExifToolbarProps) => {
  const { file, setFile } = useFileStore();
  const exifData = useExifEditorContext();

  return (
    <Toolbar aria-label="Exif editor toolbar" {...props}>
      <Button
        onPress={() => {
          const generateFile = async () => {
            const newFileInBytes = writeExifData(
              new Uint8Array(await file.arrayBuffer()),
              exifData.saveData(),
            );

            const newFile = new File(
              [new Uint8Array(newFileInBytes)],
              file.name,
              {
                type: file.type,
                lastModified: new Date().getTime(),
              },
            );
            setFile(newFile);
            return newFile;
          };

          // For an unfathomable reason, Mobile iOS specifically seems to have
          // issues with saveFile(), returning a NotReadableError "The I/O read
          // operation failed." afterwards. For more information, see
          // jeremy-code/exifi#7.
          if (isMobileWebKit()) {
            // Safari seemingly blocks asynchronous calls to window.open:
            // https://stackoverflow.com/a/39387533/18551960
            const windowProxy = window.open(undefined, "_blank");

            void generateFile().then((file) => {
              if (windowProxy !== null) {
                const blobUrl = URL.createObjectURL(file);
                windowProxy.location.assign(blobUrl);
                URL.revokeObjectURL(blobUrl);
              }
              return;
            });
          } else {
            void generateFile().then(saveFile);
          }
        }}
      >
        <Save size={16} />
        Save
      </Button>
      <AddEntryDialog />
      <AddGpsEntriesDialog />
      <ExifMenu />
    </Toolbar>
  );
};

export { ExifToolbar };
