import { useSuspenseQuery } from "@tanstack/react-query";
import { ExifData } from "libexif-wasm";

const useExifData = (file: File) => {
  const { data: exifData } = useSuspenseQuery({
    queryKey: [
      "useExifData",
      {
        name: file.name,
        size: file.size,
        type: file.type,
        webkitRelativePath: file.webkitRelativePath,
        lastModified: file.lastModified,
      },
      file,
    ],
    queryFn: async () => {
      try {
        return await ExifData.fromReadableStream(file.stream());
      } catch (_) {
        // Since rather than returning an empty ExifData, exifLoaderWrite errors
        // when there is no Exif data (even if it is a valid JPG), load ExifData
        // from buffer instead
        return ExifData.from(await file.arrayBuffer());
      }
    },
    gcTime: 30_000, // By default, it is 300,000
  });

  return exifData;
};

export { useExifData };
