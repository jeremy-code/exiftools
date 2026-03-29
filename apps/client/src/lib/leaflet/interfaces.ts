type Direction = "N" | "E" | "S" | "W";

const isDirection = (value: unknown): value is Direction => {
  return (
    typeof value == "string" &&
    (value === "N" || value === "E" || value === "S" || value === "W")
  );
};

export { type Direction, isDirection };
