import { ExifData } from "libexif-wasm";
import { describe, it, expect } from "vitest";

import { MOCK_EXIF_DATA_OBJECT } from "#__mocks__/mockExifDataObjects";
import { MOCK_JPEG_EXIF_IMAGE_1 } from "#__mocks__/mockImages";

import { deserializeExifData } from "./deserializeExifData";
import { serializeExifData } from "./serializeExifData";

describe("deserializeExifData", () => {
  it("deserializes ExifDataObject into ExifData", () => {
    const buffer = MOCK_JPEG_EXIF_IMAGE_1.buffer;
    const exifData = ExifData.from(buffer);
    const deserializedExifDataObject = deserializeExifData(
      MOCK_EXIF_DATA_OBJECT,
    );
    expect(exifData.saveData()).toStrictEqual(
      deserializedExifDataObject.saveData(),
    );
    exifData.free();
    deserializedExifDataObject.free();
  });
  it("deserialized ExifData is equivalent to original ExifData", () => {
    const buffer = MOCK_JPEG_EXIF_IMAGE_1.buffer;
    const exifData = ExifData.from(buffer);
    const deserializedExifDataObject = deserializeExifData(
      serializeExifData(exifData),
    );
    expect(deserializedExifDataObject.saveData()).toStrictEqual(
      exifData.saveData(),
    );
    deserializedExifDataObject.free();
    exifData.free();
  });
});
