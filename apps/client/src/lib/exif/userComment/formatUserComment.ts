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
      throw new Error("JIS encoding is not supported");
    default:
      assertNever(userComment.encoding);
  }
};

export { formatUserComment };
