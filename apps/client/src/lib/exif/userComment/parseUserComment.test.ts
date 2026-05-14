import { describe, expect, test } from "vitest";

import { parseUserComment } from "./parseUserComment";

describe("parseUserComment", () => {
  test("parses UserComment data", () => {
    expect(parseUserComment([65, 83, 67, 73, 73, 0, 0, 0, 10])).toStrictEqual({
      encoding: "ASCII",
      value: "\n",
    });
  });
});
