import type { Direction } from "./interfaces";

const MINUTES_IN_DEGREE = 60;
const SECONDS_IN_DEGREE = 3600;

const dmsToDecimalDegrees = (
  degrees: number,
  minutes: number,
  seconds: number,
  direction: Direction,
): number => {
  const absoluteDecimalDegrees =
    degrees + minutes / MINUTES_IN_DEGREE + seconds / SECONDS_IN_DEGREE;

  return direction === "S" || direction === "W" ?
      -absoluteDecimalDegrees
    : absoluteDecimalDegrees;
};

export { dmsToDecimalDegrees };
