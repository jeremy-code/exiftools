import type { ExifEntry } from "libexif-wasm";

import { dmsToDecimalDegrees } from "#lib/leaflet/dmsToDecimalDegrees";
import { isDirection } from "#lib/leaflet/interfaces";

import { parseRationals } from "../parseRationals";

const parseCoordinateEntry = (
  coordinateEntry: ExifEntry,
  coordinateRefEntry: ExifEntry,
): number => {
  const [degrees, minutes, seconds] = parseRationals(coordinateEntry);
  const coordinateRef = coordinateRefEntry.getValue();

  if (degrees === undefined || minutes === undefined || seconds === undefined) {
    throw new Error(
      `GPS tag "${coordinateEntry.tag}" has a corrupted value: ${coordinateEntry.getValue()}.`,
    );
  }
  if (!isDirection(coordinateRef)) {
    throw new Error(
      `GPS ref tag "${coordinateRefEntry.tag}" has a corrupted value: ${coordinateRefEntry.getValue()}.`,
    );
  }

  return dmsToDecimalDegrees(degrees, minutes, seconds, coordinateRef);
};

export { parseCoordinateEntry };
