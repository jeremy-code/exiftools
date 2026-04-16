import { createFileRoute } from "@tanstack/react-router";

import { useFileStore } from "#hooks/useFileStore";

import { ExifViewer } from "./-ExifViewer";

const ViewerComponent = () => {
  const { file } = useFileStore();

  return <ExifViewer file={file} />;
};

const Route = createFileRoute("/_app/viewer/")({
  component: ViewerComponent,
});

export { Route };
