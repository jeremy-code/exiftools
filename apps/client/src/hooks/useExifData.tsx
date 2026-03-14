import { useEffect, useMemo } from "react";

import { ExifData } from "libexif-wasm";

const useExifData = <TArrayBuffer extends ArrayBufferLike = ArrayBufferLike>(
  arrayBuffer: TArrayBuffer | undefined,
) => {
  const exifData = useMemo(
    () => (arrayBuffer !== undefined ? ExifData.from(arrayBuffer) : null),
    [arrayBuffer],
  );

  useEffect(() => {
    // Always free exifData memory on component mount/unmount
    return () => {
      exifData?.free();
    };
  }, [exifData]);

  return exifData;
};

export { useExifData };
