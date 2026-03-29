type Direction = "N" | "E" | "S" | "W";

const isDirection = (value: unknown): value is Direction => {
  return (
    typeof value == "string" &&
    (value === "N" || value === "E" || value === "S" || value === "W")
  );
};

type DMS = {
  degrees: number;
  minutes: number;
  seconds: number;
  direction: Direction;
};

export { type Direction, isDirection, type DMS };
