import { ExifIfd, type ExifData } from "libexif-wasm";

import { parseDateTimeEntries } from "#lib/exif/parseDateTimeEntries";
import {
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
} from "@exifi/ui/components/DataList";

type ExifDateTimeInformationProps = {
  exifData: ExifData;
};

const ExifDateTimeInformation = ({
  exifData,
}: ExifDateTimeInformationProps) => {
  const exifDataExifIfd = exifData.ifd[ExifIfd.EXIF];
  const dateTimeOriginalEntry = exifDataExifIfd.getEntry("DATE_TIME_ORIGINAL");
  const dateTimeDigitizedEntry = exifDataExifIfd.getEntry(
    "DATE_TIME_DIGITIZED",
  );
  const dateTimeOriginal =
    dateTimeOriginalEntry !== null ?
      parseDateTimeEntries(
        dateTimeOriginalEntry.toString(),
        exifDataExifIfd.getEntry("OFFSET_TIME_ORIGINAL")?.toString(),
        exifDataExifIfd.getEntry("SUB_SEC_TIME_ORIGINAL")?.toString(),
      )
    : null;
  const dateTimeDigitized =
    dateTimeDigitizedEntry !== null ?
      parseDateTimeEntries(
        dateTimeDigitizedEntry.toString(),
        exifDataExifIfd.getEntry("OFFSET_TIME_DIGITIZED")?.toString(),
        exifDataExifIfd.getEntry("SUB_SEC_TIME_DIGITIZED")?.toString(),
      )
    : null;

  return (
    <>
      {dateTimeOriginal !== null && (
        <DataListItem>
          <DataListItemLabel>Date and Time (Original)</DataListItemLabel>
          <DataListItemValue>
            <time dateTime={dateTimeOriginal.toString()}>
              {dateTimeOriginal.toInstant().toLocaleString()}
            </time>
          </DataListItemValue>
        </DataListItem>
      )}
      {dateTimeDigitized !== null && (
        <DataListItem>
          <DataListItemLabel>Date and Time (Digitized)</DataListItemLabel>
          <DataListItemValue>
            <time dateTime={dateTimeDigitized.toString()}>
              {dateTimeDigitized.toInstant().toLocaleString()}
            </time>
          </DataListItemValue>
        </DataListItem>
      )}
    </>
  );
};

export { ExifDateTimeInformation, type ExifDateTimeInformationProps };
