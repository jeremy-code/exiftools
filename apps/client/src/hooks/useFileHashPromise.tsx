import { useMemo } from "react";

import { sha256 } from "hash-wasm";

const getFileHash = async (file: File): Promise<string> => {
  const fileInBytes = await file.bytes();
  const fileHash = await sha256(fileInBytes);

  return fileHash;
};

const useFileHashPromise = (file: File) => {
  const fileHashPromise = useMemo(() => getFileHash(file), [file]);
  return fileHashPromise;
};

export { useFileHashPromise };
