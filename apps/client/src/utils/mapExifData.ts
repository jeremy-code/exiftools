import { ExifIfd, type ExifData } from "libexif-wasm";
import { getEnumKeyFromValue } from "libexif-wasm/utils";

type ExifDataObject = {
  [exifIfd: string]: {
    [exifTag: string]: string | null;
  } | null;
};

const mapExifData = (exifData: ExifData) => {
  return exifData.ifd.reduce<ExifDataObject>(
    (acc, exifContent, index) => {
      const entries = exifContent.entries.flatMap((entry) =>
        entry.tag !== null ? ([[entry.tag, entry.getValue()]] as const) : [],
      );

      return {
        ...acc,
        [getEnumKeyFromValue(ExifIfd, index) ?? "COUNT"]:
          entries.length !== 0 ? Object.fromEntries(entries) : null,
      };
    },
    { IFD_0: null, IFD_1: null, EXIF: null, GPS: null, INTEROPERABILITY: null },
  );
};

export { mapExifData, type ExifDataObject };
