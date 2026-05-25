import type { DataType } from "libexif-wasm";

const MAX_INT32_VALUE = 0x7fffffff;

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

export { MAX_INT32_VALUE, MAX_UINT32_VALUE, DATA_TYPE_MAP };
