import type { ComponentPropsWithRef, ReactNode } from "react";

import { Dropzone } from "#components/file/Dropzone";
import { FileUrlInput } from "#components/file/FileUrlInput";
import { DropzoneStoreProvider } from "#hooks/useDropzoneStore";
import { FileStoreProvider } from "#hooks/useFileStore";
import { Heading } from "@exifi/ui/components/Heading";
import { TabPanel } from "@exifi/ui/components2/Tabs";

type FileTabsContentProps = {
  file: File | null;
  id: string;
  updateFile: (file: File) => void;
  children: ReactNode;
} & Omit<ComponentPropsWithRef<typeof TabPanel>, "id">;

const FileTabsContent = ({
  children,
  id,
  file,
  updateFile,
  ...props
}: FileTabsContentProps) => {
  return (
    <TabPanel {...props} id={id}>
      <DropzoneStoreProvider>
        {file === null ?
          <div className="flex flex-col gap-2">
            <Heading as="h1" size="2xl" className="mb-4">
              Upload file to view Exif metadata
            </Heading>

            <Dropzone
              dropzoneOptions={{
                maxFiles: 1,
                onDropAccepted: (acceptedFiles) => {
                  if (acceptedFiles.length > 0) {
                    updateFile(acceptedFiles[0]!);
                  }
                },
              }}
              rootProps={{ className: "min-h-25" }}
            />

            <div className="flex items-center gap-4 text-muted-foreground before:h-px before:grow before:bg-muted after:h-px after:grow after:bg-muted">
              OR
            </div>
            <FileUrlInput
              onSuccess={(file) => updateFile(file)}
              inputProps={{
                placeholder:
                  "https://upload.wikimedia.org/wikipedia/commons/c/c9/Metadata_demo_exif_only.jpg",
              }}
            />
          </div>
        : <FileStoreProvider
            initialFile={file}
            onFileChange={(file) => updateFile(file)}
          >
            {children}
          </FileStoreProvider>
        }
      </DropzoneStoreProvider>
    </TabPanel>
  );
};

export { FileTabsContent, type FileTabsContentProps };
