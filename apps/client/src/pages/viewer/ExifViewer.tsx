import { useEffect, useEffectEvent, useState } from "react";

import { ExifData } from "libexif-wasm";

import { mapExifData } from "#utils/mapExifData";

type ExifViewerProps = {
  file: File;
};

const ExifViewer = ({ file }: ExifViewerProps) => {
  const [arrayBuffer, setArrayBuffer] = useState<ArrayBuffer | null>(null);
  const exifData = arrayBuffer !== null ? ExifData.from(arrayBuffer) : null;
  const freeExifData = useEffectEvent(() => {
    exifData?.free();
  });

  useEffect(() => {
    void file.arrayBuffer().then((a) => setArrayBuffer(a));
  }, [file]);

  useEffect(() => {
    return freeExifData;
  }, []);

  // TODO: This loads both on loading state and in error state, fix that
  if (exifData === null) {
    return (
      <>An error occurred while attempting to read the file's EXIF data.</>
    );
  }

  const exifDataObject = mapExifData(exifData);

  const rows = Object.entries(exifDataObject).flatMap(([ifd, value]) =>
    value === null ?
      [{ ifd, tag: "—", value: "empty" }]
    : Object.entries(value).map(([tag, val]) => ({ ifd, tag, value: val })),
  );

  // TODO: Display data in something better than a table
  return (
    <table className="w-full text-sm">
      <thead>
        <tr>
          <th className="p-2 text-left font-medium">IFD</th>
          <th className="p-2 text-left font-medium">Tag</th>
          <th className="p-2 text-left font-medium">Value</th>
        </tr>
      </thead>
      <tbody>
        {rows.map(({ ifd, tag, value }) => (
          <tr key={`${ifd}-${tag}`}>
            <td className="p-2 font-mono">{ifd}</td>
            <td className="p-2 font-mono">{tag}</td>
            <td className="p-2">{String(value)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export { ExifViewer, type ExifViewerProps };
