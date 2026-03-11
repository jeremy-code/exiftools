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

  // TODO: Display data in something better than a table
  return (
    <div className="space-y-6">
      {Object.entries(exifDataObject).map(([ifd, value]) => (
        <div key={ifd}>
          <h3 className="mb-2 font-semibold">{ifd}</h3>
          {value !== null ?
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="border-b">
                  <th className="p-2 text-left font-medium">Tag</th>
                  <th className="p-2 text-left font-medium">Value</th>
                </tr>
              </thead>
              <tbody>
                {Object.entries(value).map(([tag, val]) => (
                  <tr key={tag} className="border-b">
                    <td className="p-2">{val?.title ?? tag}</td>
                    <td className="p-2">{String(val?.value)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          : <p className="text-muted-foreground">empty</p>}
        </div>
      ))}
    </div>
  );
};

export { ExifViewer, type ExifViewerProps };
