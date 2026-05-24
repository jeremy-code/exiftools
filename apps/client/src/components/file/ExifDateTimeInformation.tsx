import { type ExifData } from "libexif-wasm";
import { useLocale } from "react-aria-components/I18nProvider";

import { parseDateTimeEntries } from "#lib/exif/parseDateTimeEntries";
import { parseGpsDateTimeEntries } from "#lib/exif/parseGpsDateTimeEntries";
import {
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
} from "@exifi/ui/components/DataList";
import {
  Tooltip,
  TooltipTarget,
  TooltipTrigger,
} from "@exifi/ui/components/Tooltip";

type ExifDateTimeInformationProps = {
  exifData: ExifData;
};

type DateTimeItem = { label: string; value: Temporal.ZonedDateTime };

const ExifDateTimeInformation = ({
  exifData,
}: ExifDateTimeInformationProps) => {
  const { locale } = useLocale();
  const dateTimeFormatter = new Intl.DateTimeFormat(locale);

  const dateTime = parseDateTimeEntries(exifData, "DATE_TIME");
  const dateTimeOriginal = parseDateTimeEntries(exifData, "DATE_TIME_ORIGINAL");
  const dateTimeDigitized = parseDateTimeEntries(
    exifData,
    "DATE_TIME_DIGITIZED",
  );
  const dateTimeGps = parseGpsDateTimeEntries(exifData);

  const dateTimeItems = Array.from(
    [
      { label: "Date and Time", value: dateTime },
      { label: "Date and Time (Original)", value: dateTimeOriginal },
      { label: "Date and Time (Digitized)", value: dateTimeDigitized },
      { label: "Date and Time (GPS)", value: dateTimeGps },
    ]
      .reduce((acc, { label, value }) => {
        if (value !== null) {
          const key = dateTimeFormatter.format(value.toInstant());
          // Deduplicate entries, priority goes to the first encountered
          if (!acc.has(key)) {
            acc.set(key, { label, value });
          }
        }
        return acc;
      }, new Map<string, DateTimeItem>())
      .values(),
  );

  return dateTimeItems.map(({ label, value }) => (
    <DataListItem key={label}>
      <DataListItemLabel>{label}</DataListItemLabel>
      <DataListItemValue>
        <TooltipTrigger>
          <TooltipTarget>
            <span role="button">
              <time dateTime={value.toString()}>
                {dateTimeFormatter.format(value.toInstant())}
              </time>
            </span>
          </TooltipTarget>
          <Tooltip>{value.toLocaleString()}</Tooltip>
        </TooltipTrigger>
      </DataListItemValue>
    </DataListItem>
  ));
};

export { ExifDateTimeInformation, type ExifDateTimeInformationProps };
