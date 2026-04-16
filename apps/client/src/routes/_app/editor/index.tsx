import { createFileRoute } from "@tanstack/react-router";

import { useFileStore } from "#hooks/useFileStore";

import { ExifEditor } from "./-ExifEditor";

const EditorComponent = () => {
  const { file } = useFileStore();

  return <ExifEditor file={file} />;
};

const Route = createFileRoute("/_app/editor/")({
  component: EditorComponent,
});

export { Route };
