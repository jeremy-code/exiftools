import { type ExifContent } from "libexif-wasm";

import { dayjs } from "#utils/date";
import { encodeStringToUtf8 } from "#utils/encodeStringToUtf8";

import { getOrInsertEntry } from "./getOrInsertEntry";

const EXIF_TIMESTAMP_FORMAT = "YYYY:MM:DD HH:mm:ss";

const updateDateAndTimeDigitized = (exifDataExifIfd: ExifContent) => {
  const currentDate = dayjs.utc().local();

  const dateTimeDigitizedEntry = getOrInsertEntry(
    exifDataExifIfd,
    "DATE_TIME_DIGITIZED",
  );
  dateTimeDigitizedEntry.format = "ASCII";
  dateTimeDigitizedEntry.fromTypedArray(
    encodeStringToUtf8(currentDate.format(EXIF_TIMESTAMP_FORMAT)),
  );
  const offsetTimeDigitizedEntry = getOrInsertEntry(
    exifDataExifIfd,
    "OFFSET_TIME_DIGITIZED",
  );
  offsetTimeDigitizedEntry.format = "ASCII";
  offsetTimeDigitizedEntry.fromTypedArray(
    encodeStringToUtf8(currentDate.format("Z")),
  );
  console.log(
    dateTimeDigitizedEntry.toString(),
    offsetTimeDigitizedEntry.toString(),
  );
};

export { updateDateAndTimeDigitized };
