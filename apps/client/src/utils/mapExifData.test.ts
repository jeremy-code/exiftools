import {
  ExifData,
  ExifTagInfo,
  type ExifIfdKey,
  type ExifTagKey,
} from "libexif-wasm";
import { describe, expect, it } from "vitest";

import {
  MOCK_JPEG_EXIF_IMAGE_1,
  MOCK_JPEG_NO_EXIF_IMAGE,
} from "#__mocks__/mockImages";

import { mapExifData, type ExifDataObject } from "./mapExifData";

const buildExpectedExifObject = (
  testObject: Record<
    Exclude<ExifIfdKey, "COUNT">,
    Partial<Record<ExifTagKey, string | null>> | null
  >,
) =>
  Object.fromEntries(
    (
      Object.entries(testObject) as [
        ExifIfdKey,
        Record<ExifTagKey, string | null> | null,
      ][]
    ).map(([ifd, exifTagMap]) =>
      exifTagMap === null ?
        [ifd, exifTagMap]
      : [
          ifd,
          (Object.entries(exifTagMap) as [ExifTagKey, string | null][]).reduce<
            NonNullable<NonNullable<ExifDataObject>[string]>
          >((acc, [exifTagKey, exifTagValue]) => {
            acc[exifTagKey] = {
              name: ExifTagInfo.getNameInIfd(exifTagKey, ifd),
              title: ExifTagInfo.getTitleInIfd(exifTagKey, ifd),
              description: ExifTagInfo.getDescriptionInIfd(exifTagKey, ifd),
              value: exifTagValue,
            };
            return acc;
          }, {}),
        ],
    ),
  ) as ExifDataObject;

describe("mapExifData()", () => {
  describe("when the JPEG contains no EXIF data", () => {
    it("returns null for all IFDs", () => {
      const exifData = ExifData.newFromData(MOCK_JPEG_NO_EXIF_IMAGE);
      const expected = {
        IFD_0: null,
        IFD_1: null,
        EXIF: null,
        GPS: null,
        INTEROPERABILITY: null,
      };
      const result = mapExifData(exifData);

      expect(result).toStrictEqual(expected);
    });
  });

  describe("when the JPEG contains EXIF data", () => {
    it("maps all tags into an ExifDataObject", () => {
      const exifData = ExifData.newFromData(MOCK_JPEG_EXIF_IMAGE_1);
      const expected = buildExpectedExifObject({
        IFD_0: {
          RESOLUTION_UNIT: "Inch",
          X_RESOLUTION: "72",
          Y_RESOLUTION: "72",
          YCBCR_POSITIONING: "Centered",
        },
        IFD_1: null,
        EXIF: {
          COLOR_SPACE: "Uncalibrated",
          COMPONENTS_CONFIGURATION: "Y Cb Cr -",
          DATE_TIME_ORIGINAL: "1970:01:01 12:00:00",
          EXIF_VERSION: "Exif Version 2.32",
          FLASH_PIX_VERSION: "FlashPix Version 1.0",
        },
        GPS: null,
        INTEROPERABILITY: null,
      });
      const result = mapExifData(exifData);

      expect(result).toStrictEqual(expected);
    });
  });
});
