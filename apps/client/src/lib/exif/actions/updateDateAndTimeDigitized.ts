import { format } from "date-fns/format";
import { ExifIfd, type ExifData } from "libexif-wasm";

import { encodeStringToUtf8 } from "#utils/encodeStringToUtf8";

import { EXIF_TIMESTAMP_FORMAT } from "../constants";
import { getOrInsertEntry } from "../getOrInsertEntry";

const updateDateAndTimeDigitized = (exifData: ExifData) => {
  const exifDataExifIfd = exifData.ifd[ExifIfd.EXIF];

  const currentDate = new Date();

  const dateTimeDigitizedEntry = getOrInsertEntry(
    exifDataExifIfd,
    "DATE_TIME_DIGITIZED",
  );
  dateTimeDigitizedEntry.format = "ASCII";
  dateTimeDigitizedEntry.fromTypedArray(
    encodeStringToUtf8(format(currentDate, EXIF_TIMESTAMP_FORMAT)),
  );
  const subSecTimeDigitizedEntry = getOrInsertEntry(
    exifDataExifIfd,
    "SUB_SEC_TIME_DIGITIZED",
  );
  subSecTimeDigitizedEntry.format = "ASCII";
  subSecTimeDigitizedEntry.fromTypedArray(
    encodeStringToUtf8(format(currentDate, "SSS")),
  );
  const offsetTimeDigitizedEntry = getOrInsertEntry(
    exifDataExifIfd,
    "OFFSET_TIME_DIGITIZED",
  );
  offsetTimeDigitizedEntry.format = "ASCII";
  offsetTimeDigitizedEntry.fromTypedArray(
    encodeStringToUtf8(format(currentDate, "xxx")),
  );
};

export { updateDateAndTimeDigitized };
