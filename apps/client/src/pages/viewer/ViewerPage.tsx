import { Dropzone } from "#components/file/Dropzone";
import { useDropzoneState } from "#hooks/useDropzoneState";

import { ExifViewer } from "./ExifViewer";

const ViewerPage = () => {
  const acceptedFiles = useDropzoneState((state) => state.acceptedFiles);

  if (acceptedFiles.length === 0) {
    return <Dropzone dropzoneOptions={{ maxFiles: 1 }} />;
  }

  if (acceptedFiles.length === 1 && acceptedFiles[0] !== undefined) {
    return <ExifViewer file={acceptedFiles[0]} />;
  }

  // TODO: Handle this case
  return null;
};

export { ViewerPage };
