import { Dropzone } from "#components/file/Dropzone";
import { useDropzoneState } from "#hooks/useDropzoneState";
import { Heading } from "@exiftools/ui/components/Heading";

import { ExifViewer } from "./ExifViewer";

const ViewerPage = () => {
  const acceptedFiles = useDropzoneState((state) => state.acceptedFiles);

  if (acceptedFiles.length === 0) {
    return (
      <>
        <Heading as="h1" size="2xl" className="mb-4">
          Upload file to view Exif metadata
        </Heading>
        <Dropzone
          dropzoneOptions={{ maxFiles: 1 }}
          rootProps={{ className: "min-h-25" }}
        />
      </>
    );
  }

  if (acceptedFiles.length === 1 && acceptedFiles[0] !== undefined) {
    return <ExifViewer file={acceptedFiles[0]} />;
  }

  // TODO: Handle this case
  return null;
};

export { ViewerPage };
