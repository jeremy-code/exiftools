import { dayjs } from "#utils/date";

const EXIF_TIMESTAMP_FORMAT = "YYYY:MM:DD HH:mm:ss";

const parseDateTimeEntries = (
  dateTime: string,
  offsetTime: string | undefined,
  subSecTime: string | undefined,
) => {
  const dateTimeDayjs = dayjs.tz(
    dateTime,
    EXIF_TIMESTAMP_FORMAT,
    offsetTime ?? "UTC",
  );

  if (subSecTime !== undefined && !Number.isNaN(Number(subSecTime))) {
    return dateTimeDayjs.add(Number(subSecTime), "millisecond");
  }

  return dateTimeDayjs;
};

export { parseDateTimeEntries };
