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
  // DATE_TIME may be in IFD0 or IFD1
  const dateTimeEntry = exifData.getEntry("DATE_TIME");
  const exifDataExifIfd = exifData.ifd[ExifIfd.EXIF];
  const dateTimeOriginalEntry = exifDataExifIfd.getEntry("DATE_TIME_ORIGINAL");
  const dateTimeDigitizedEntry = exifDataExifIfd.getEntry(
    "DATE_TIME_DIGITIZED",
  );
  const dateTime =
    dateTimeEntry !== null ?
      parseDateTimeEntries(
        dateTimeEntry.toString(),
        exifDataExifIfd.getEntry("OFFSET_TIME")?.toString(),
        exifDataExifIfd.getEntry("SUB_SEC_TIME")?.toString(),
      )
    : null;
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
      {dateTime !== null && (
        <DataListItem>
          <DataListItemLabel>Date and Time</DataListItemLabel>
          <DataListItemValue>
            <time dateTime={dateTime.toString()}>
              {dateTime.toInstant().toLocaleString()}
            </time>
          </DataListItemValue>
        </DataListItem>
      )}
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
