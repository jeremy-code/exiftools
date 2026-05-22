import { concat } from "@std/bytes";
import { encode } from "iconv-lite";

import { assertNever } from "#utils/assertNever";

import { ENCODING_TO_HEADER_MAP } from "./constants";
import type { UserComment } from "./interfaces";

const textEncoder = new TextEncoder();

const formatUserComment = (userComment: UserComment): Uint8Array => {
  switch (userComment.encoding) {
    case "ASCII":
    case "UNICODE":
    case "EMPTY":
      return textEncoder.encode(
        `${ENCODING_TO_HEADER_MAP[userComment.encoding]}${userComment.value}`,
      );
    case "JIS":
      return concat([
        textEncoder.encode(ENCODING_TO_HEADER_MAP[userComment.encoding]),
        encode(userComment.value, "euc-jp"),
      ]);
    default:
      assertNever(userComment.encoding);
  }
};

export { formatUserComment };
