import { ExifTagInfo } from "libexif-wasm";

import type { ExifEntryObject } from "../serializeExifData";

const getExifEntryObjectLabel = (exifEntryObject: ExifEntryObject) => {
  const title = ExifTagInfo.getTitleInIfd(
    exifEntryObject.tag,
    exifEntryObject.ifd,
  );

  if (title === "") {
    const name = ExifTagInfo.getNameInIfd(
      exifEntryObject.tag,
      exifEntryObject.ifd,
    );

    return name !== "" ? name : exifEntryObject.tag;
  }
  return title;
};

export { getExifEntryObjectLabel };
