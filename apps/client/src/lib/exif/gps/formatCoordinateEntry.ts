import type { ExifEntry } from "libexif-wasm";

import { isDirection } from "#lib/leaflet/interfaces";

import { parseRationals } from "../parseRationals";

const formatCoordinateEntry = (
  coordinateEntry: ExifEntry,
  coordinateRefEntry: ExifEntry,
): string => {
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

  return `${degrees}° ${minutes}\u2032 ${seconds}″ ${coordinateRef}`;
};

export { formatCoordinateEntry };
