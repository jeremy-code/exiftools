import type { ExifEntry } from "libexif-wasm";

const UINT32_SIZE_IN_BYTES = 4;

const parseRationals = (exifEntry: ExifEntry) => {
  if (exifEntry.format !== "RATIONAL") {
    throw new Error("Invalid entry");
  }

  const data = new Uint8Array(exifEntry.data);
  const dataView = new DataView(data.buffer);

  const result = [];

  for (let i = 0; i < data.length; i += 2 * UINT32_SIZE_IN_BYTES) {
    const numerator = dataView.getUint32(i, true);
    const denominator = dataView.getUint32(i + UINT32_SIZE_IN_BYTES, true);
    if (denominator === 0) {
      throw new Error(
        `Zero denominator encountered at byte offset ${i} when parsing ${exifEntry.tag}.`,
      );
    }
    result.push(numerator / denominator);
  }

  return result;
};

export { parseRationals };
