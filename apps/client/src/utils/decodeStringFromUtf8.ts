const textDecoder = new TextDecoder("utf-8");

const decodeStringFromUtf8 = (...params: Parameters<TextDecoder["decode"]>) => {
  const output = textDecoder.decode(...params);

  if (output.charAt(output.length - 1) === "\0") {
    return output.slice(0, output.length - 1);
  }
  return output;
};

export { decodeStringFromUtf8 };
