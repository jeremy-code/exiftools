import { ExifEntry } from "libexif-wasm";
import { describe, expect, it } from "vitest";

import { parseRationals } from "./parseRationals";

const UINT32_SIZE_IN_BYTES = 4;

describe("parseRationals()", () => {
  describe("parses ExifEntry rationals", () => {
    it.each([
      [
        new Uint8Array([
          80, 0, 0, 0, 1, 0, 0, 0, 76, 213, 1, 0, 16, 39, 0, 0, 0, 0, 0, 0, 1,
          0, 0, 0,
        ]),
        [80, 12.014, 0],
      ],
      [
        new Uint8Array([
          26, 0, 0, 0, 1, 0, 0, 0, 70, 85, 5, 0, 16, 39, 0, 0, 0, 0, 0, 0, 1, 0,
          0, 0,
        ]),
        [26, 34.951, 0],
      ],
    ])("formats %i bytes correctly", (input, expected) => {
      const entry1 = ExifEntry.new();
      entry1.tag = "LATITUDE";
      entry1.format = "RATIONAL";
      entry1.data = input;
      entry1.components = input.length / (UINT32_SIZE_IN_BYTES * 2);
      entry1.size = input.length;

      expect(parseRationals(entry1)).toStrictEqual(expected);
    });
  });
});
