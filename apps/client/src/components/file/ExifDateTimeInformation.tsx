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

type DateTimeItem = { label: string; value: Temporal.ZonedDateTime };

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

  const dateTimeItems = Array.from(
    // Use Map to deduplicate by .toString() of Temporal.ZonedDateTime
    new Map(
      [
        { label: "Date and Time", value: dateTime },
        { label: "Date and Time (Original)", value: dateTimeOriginal },
        { label: "Date and Time (Digitized)", value: dateTimeDigitized },
      ]
        .filter((value): value is DateTimeItem => value !== null)
        .map((dateTimeItem) => [dateTimeItem.value.toString(), dateTimeItem]),
    ).values(),
  );

  return dateTimeItems.map(({ label, value }) => (
    <DataListItem key={label}>
      <DataListItemLabel>{label}</DataListItemLabel>
      <DataListItemValue>
        <time dateTime={value.toString()}>
          {value.toInstant().toLocaleString()}
        </time>
      </DataListItemValue>
    </DataListItem>
  ));
};

export { ExifDateTimeInformation, type ExifDateTimeInformationProps };
