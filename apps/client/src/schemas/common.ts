import { z } from "zod";

const Latitude = z
  .number()
  .min(-90, "Latitude must be at least -90 degrees.")
  .max(90, "Latitude must be less than or equal to 90 degrees.");

const Longitude = z
  .number()
  .min(-180, "Longitude must be at least 180 degrees.")
  .lt(180, "Longitude must be less than 180 degrees.");

export { Longitude, Latitude };
