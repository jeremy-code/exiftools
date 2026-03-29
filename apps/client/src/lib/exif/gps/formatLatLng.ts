import type { ExifContent } from "libexif-wasm";

import { getRequiredEntry } from "../getRequiredEntry";
import { formatCoordinateEntry } from "./formatCoordinateEntry";
import { parseRationals } from "../parseRationals";

const formatLatLngFromExif = (exifDataGpsIfd: ExifContent): string => {
  const latitude = formatCoordinateEntry(
    getRequiredEntry(exifDataGpsIfd, "LATITUDE"),
    getRequiredEntry(exifDataGpsIfd, "LATITUDE_REF"),
  );
  const longitude = formatCoordinateEntry(
    getRequiredEntry(exifDataGpsIfd, "LONGITUDE"),
    getRequiredEntry(exifDataGpsIfd, "LONGITUDE_REF"),
  );

  const altitudeEntry = exifDataGpsIfd.getEntry("ALTITUDE");
  const altitudeRefEntry = exifDataGpsIfd.getEntry("ALTITUDE_REF");

  if (altitudeEntry !== null && altitudeRefEntry !== null) {
    const altitude = parseRationals(altitudeEntry)[0];
    if (altitude !== undefined) {
      const isSeaLevel = altitudeRefEntry.data[0] === 0;
      return `${latitude} ${longitude} ${isSeaLevel ? "" : "\u2212"}${altitude}m`;
    }
  }

  return `${latitude} ${longitude}`;
};

export { formatLatLngFromExif };
