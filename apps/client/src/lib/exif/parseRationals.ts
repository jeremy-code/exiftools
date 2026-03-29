import {
  exifGetRational,
  exifFormatGetSize,
  type ExifEntry,
} from "libexif-wasm";

const RATIONAL_SIZE = exifFormatGetSize("RATIONAL");

const parseRationals = (exifEntry: ExifEntry) => {
  if (exifEntry.format !== "RATIONAL") {
    throw new Error("Invalid entry");
  }

  const byteOrder = exifEntry.parent?.parent?.getByteOrder() ?? "MOTOROLA";

  return Array.from({ length: exifEntry.components }, (_, index) => {
    const offset = index * RATIONAL_SIZE;
    const rational = exifGetRational(
      exifEntry.data.subarray(offset, offset + RATIONAL_SIZE),
      byteOrder,
    );
    if (rational.denominator === 0) {
      throw new Error(
        `Exif entry "${exifEntry.tag}" has a rational with a denominator of 0.`,
      );
    }
    return rational.numerator / rational.denominator;
  });
};

export { parseRationals };
