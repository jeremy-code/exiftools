import { parse } from "date-fns/parse";

import { EXIF_TIMESTAMP_FORMAT } from "./constants";

const parseDateTimeEntries = (
  dateTime: string,
  offsetTime: string | undefined,
  subSecTime: string | undefined,
) => {
  const dateTimeDate = parse(dateTime, EXIF_TIMESTAMP_FORMAT, new Date());

  return Temporal.ZonedDateTime.from({
    year: dateTimeDate.getFullYear(),
    month: dateTimeDate.getMonth() + 1,
    day: dateTimeDate.getDate(),
    hour: dateTimeDate.getHours(),
    minute: dateTimeDate.getMinutes(),
    second: dateTimeDate.getSeconds(),
    millisecond:
      subSecTime !== undefined && !Number.isNaN(Number(subSecTime)) ?
        Number(subSecTime)
      : 0,
    timeZone: offsetTime ?? "UTC",
  });
};

export { parseDateTimeEntries };
