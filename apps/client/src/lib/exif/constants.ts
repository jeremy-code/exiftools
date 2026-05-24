import type { DataType } from "libexif-wasm";

/**
 * Maximum value of a 32-bit unsigned integer
 */
const MAX_UINT32_VALUE = 0xffffffff;

const DATA_TYPE_MAP: Record<DataType, string> = {
  UNCOMPRESSED_CHUNKY: "Uncompressed chunky",
  UNCOMPRESSED_PLANAR: "Uncompressed planar",
  UNCOMPRESSED_YCC: "Uncompress YCC",
  COMPRESSED: "Compressed",
  UNKNOWN: "Unknown",
};

export { MAX_UINT32_VALUE, DATA_TYPE_MAP };
