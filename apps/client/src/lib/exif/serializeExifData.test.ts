import { ExifData } from "libexif-wasm";
import { describe, it, expect } from "vitest";

import { MOCK_JPEG_EXIF_IMAGE_1 } from "#__mocks__/mockImages";
import { encodeStringToUtf8 } from "#utils/encodeStringToUtf8";

import { serializeExifData } from "./serializeExifData";

describe("serializeExifData", () => {
  it("serializes ExifData into ExifDataObject", () => {
    const buffer = MOCK_JPEG_EXIF_IMAGE_1.buffer;
    const exifData = ExifData.from(buffer);
    const exifDataObject = serializeExifData(exifData);
    expect(exifDataObject).toStrictEqual({
      byteOrder: "MOTOROLA",
      data: [],
      dataType: "COUNT",
      ifd: {
        IFD_0: [
          {
            components: 1,
            data: [0, 0, 0, 72, 0, 0, 0, 1],
            format: "RATIONAL",
            ifd: "IFD_0",
            size: 8,
            tag: "X_RESOLUTION",
            value: "72",
          },
          {
            components: 1,
            data: [0, 0, 0, 72, 0, 0, 0, 1],
            format: "RATIONAL",
            ifd: "IFD_0",
            size: 8,
            tag: "Y_RESOLUTION",
            value: "72",
          },
          {
            components: 1,
            data: [0, 2],
            format: "SHORT",
            ifd: "IFD_0",
            size: 2,
            tag: "RESOLUTION_UNIT",
            value: "Inch",
          },
          {
            components: 1,
            data: [0, 1],
            format: "SHORT",
            ifd: "IFD_0",
            size: 2,
            tag: "YCBCR_POSITIONING",
            value: "Centered",
          },
        ],
        IFD_1: [],
        EXIF: [
          {
            components: 4,
            data: [48, 50, 51, 50],
            format: "UNDEFINED",
            ifd: "EXIF",
            size: 4,
            tag: "EXIF_VERSION",
            value: "Exif Version 2.32",
          },
          {
            components: 20,
            data: Array.from(encodeStringToUtf8("1970:01:01 12:00:00")),
            format: "ASCII",
            ifd: "EXIF",
            size: 20,
            tag: "DATE_TIME_ORIGINAL",
            value: "1970:01:01 12:00:00",
          },
          {
            components: 4,
            data: [1, 2, 3, 0],
            format: "UNDEFINED",
            ifd: "EXIF",
            size: 4,
            tag: "COMPONENTS_CONFIGURATION",
            value: "Y Cb Cr -",
          },
          {
            components: 1,
            data: [255, 255],
            format: "SHORT",
            ifd: "EXIF",
            size: 2,
            tag: "COLOR_SPACE",
            value: "Uncalibrated",
          },
          {
            components: 4,
            data: [48, 49, 48, 48],
            format: "UNDEFINED",
            ifd: "EXIF",
            size: 4,
            tag: "FLASH_PIX_VERSION",
            value: "FlashPix Version 1.0",
          },
        ],
        GPS: [],
        INTEROPERABILITY: [],
      },
    });
    exifData.free();
  });
});
