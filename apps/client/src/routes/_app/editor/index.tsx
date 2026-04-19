import { createFileRoute } from "@tanstack/react-router";

import { ExifEditor } from "#features/exif-editor/ExifEditor";
import { useFileStore } from "#hooks/useFileStore";

const EditorComponent = () => {
  const { file } = useFileStore();

  return <ExifEditor file={file} />;
};

const Route = createFileRoute("/_app/editor/")({
  component: EditorComponent,
});

export { Route };
