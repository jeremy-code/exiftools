const textEncoder = new TextEncoder();

const encodeStringToUtf8 = (input: string) => {
  return textEncoder.encode(input + "\0");
};

export { encodeStringToUtf8 };
