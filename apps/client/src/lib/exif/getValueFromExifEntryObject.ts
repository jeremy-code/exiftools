import { ExifData, ExifEntry, ExifIfd } from "libexif-wasm";

import { newTypedArrayInFormat } from "./newTypedArrayInFormat";
import type { ExifEntryObject } from "./serializeExifData";

const getValueFromExifEntryObject = (
  exifEntryObject: Pick<
    ExifEntryObject,
    "ifd" | "tag" | "format" | "value" | "byteOrder"
  > &
    Partial<ExifEntryObject>,
) => {
  const exifData = ExifData.new();
  exifData.byteOrder = exifEntryObject.byteOrder;
  exifData.fix(); // Initialize any necessary entries
  const exifContent = exifData.ifd[ExifIfd[exifEntryObject.ifd]];
  const exifEntry = ExifEntry.new();
  exifEntry.tag = exifEntryObject.tag;
  exifEntry.format = exifEntryObject.format;
  exifContent.addEntry(exifEntry); // Must be added after tag is set, but before data is set, because of byte order

  exifEntry.fromTypedArray(
    newTypedArrayInFormat(exifEntryObject.value, exifEntryObject.format),
  );
  const formattedValue = exifEntry.toString();

  exifData.free();
  return formattedValue;
};

export { getValueFromExifEntryObject };
