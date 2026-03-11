import { ExifIfd, ExifTagInfo, type ExifData } from "libexif-wasm";
import { getEnumKeyFromValue } from "libexif-wasm/utils";

type ExifDataObject = {
  [exifIfd: string]: {
    [exifTag: string]: {
      name: string | null;
      title: string | null;
      description: string | null;
      value: string | null;
    } | null;
  } | null;
};

const mapExifData = (exifData: ExifData) => {
  return exifData.ifd.reduce<ExifDataObject>(
    (acc, exifContent, index) => {
      const ifd = getEnumKeyFromValue(ExifIfd, index) ?? "COUNT";
      const entries = exifContent.entries.flatMap((entry) =>
        entry.tag !== null ?
          ([
            [
              entry.tag,
              {
                name: ExifTagInfo.getNameInIfd(entry.tag, ifd),
                title: ExifTagInfo.getTitleInIfd(entry.tag, ifd),
                description: ExifTagInfo.getDescriptionInIfd(entry.tag, ifd),
                value: entry.getValue(),
              },
            ],
          ] as const)
        : [],
      );

      return {
        ...acc,
        [ifd]: entries.length !== 0 ? Object.fromEntries(entries) : null,
      };
    },
    { IFD_0: null, IFD_1: null, EXIF: null, GPS: null, INTEROPERABILITY: null },
  );
};

export { mapExifData, type ExifDataObject };
