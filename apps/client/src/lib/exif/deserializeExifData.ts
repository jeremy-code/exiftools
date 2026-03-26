import { ExifContent, ExifData, ExifEntry } from "libexif-wasm";

import type { ExifDataObject } from "./serializeExifData";

const EXIF_IFDS = [
  "IFD_0",
  "IFD_1",
  "EXIF",
  "GPS",
  "INTEROPERABILITY",
] as const;

/**
 * Deserializes an {@link ExifDataObject} serialized by serializeExifData back
 * into an {@link ExifData} instance.
 */
const deserializeExifData = (exifDataObject: ExifDataObject) => {
  const exifData = ExifData.new();

  exifData.data = new Uint8Array(exifDataObject.data);
  if (exifDataObject.dataType !== null) {
    exifData.setDataType(exifDataObject.dataType);
  }
  if (exifDataObject.byteOrder !== null) {
    exifData.setByteOrder(exifDataObject.byteOrder);
  }

  exifData.ifd = EXIF_IFDS.map((exifIfd) => {
    const exifContent = ExifContent.new();
    exifContent.parent = exifData;

    if (exifDataObject.ifd[exifIfd].length !== 0) {
      exifDataObject.ifd[exifIfd].forEach((entryObject) => {
        const entry = ExifEntry.new();
        entry.tag = entryObject.tag;
        entry.format = entryObject.format;
        entry.components = entryObject.components;
        entry.data = new Uint8Array(entryObject.data);
        entry.size = entryObject.size;
        // Setting .parent is unnecessary since it is already set by .addEntry
        exifContent.addEntry(entry);
      });
    }

    return exifContent;
  }) as [ExifContent, ExifContent, ExifContent, ExifContent, ExifContent];

  return exifData;
};

export { deserializeExifData };
