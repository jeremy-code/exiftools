import { LatLng } from "leaflet";
import type { ExifContent } from "libexif-wasm";

import { parseCoordinateEntry } from "./parseCoordinateEntry";
import { getRequiredEntry } from "../getRequiredEntry";
import { parseRationals } from "../parseRationals";

const getLatLngFromExif = (exifDataGpsIfd: ExifContent): LatLng => {
  const latitude = parseCoordinateEntry(
    getRequiredEntry(exifDataGpsIfd, "LATITUDE"),
    getRequiredEntry(exifDataGpsIfd, "LATITUDE_REF"),
  );
  const longitude = parseCoordinateEntry(
    getRequiredEntry(exifDataGpsIfd, "LONGITUDE"),
    getRequiredEntry(exifDataGpsIfd, "LONGITUDE_REF"),
  );

  const altitudeEntry = exifDataGpsIfd.getEntry("ALTITUDE");
  const altitudeRefEntry = exifDataGpsIfd.getEntry("ALTITUDE_REF");

  if (altitudeEntry !== null && altitudeRefEntry !== null) {
    const absoluteAltitude = parseRationals(altitudeEntry)[0];
    if (absoluteAltitude !== undefined) {
      const isSeaLevel = altitudeRefEntry.data[0] === 0;
      const altitude = isSeaLevel ? absoluteAltitude : -absoluteAltitude;
      return new LatLng(latitude, longitude, altitude);
    }
  }

  return new LatLng(latitude, longitude);
};

export { getLatLngFromExif };
