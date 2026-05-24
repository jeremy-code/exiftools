import { parseExifDateTime } from "./date/dateTime/parseExifDateTime";

const parseDateTimeEntries = (
  dateTime: string,
  offsetTime: string | undefined,
  subSecTime: string | undefined,
) => {
  const dateTimeDate = parseExifDateTime(dateTime);

  return Temporal.ZonedDateTime.from({
    year: dateTimeDate.year,
    month: dateTimeDate.month,
    day: dateTimeDate.day,
    hour: dateTimeDate.hour,
    minute: dateTimeDate.minute,
    second: dateTimeDate.second,
    millisecond:
      subSecTime !== undefined && !Number.isNaN(Number(subSecTime)) ?
        Number(subSecTime)
      : 0,
    timeZone: offsetTime ?? "UTC",
  });
};

export { parseDateTimeEntries };
