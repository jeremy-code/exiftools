import {
  createContext,
  use,
  useState,
  type Dispatch,
  type SetStateAction,
} from "react";

type FileStore = {
  file: File;
  setFile: Dispatch<SetStateAction<File>>;
};

const FileStoreContext = createContext<FileStore | null>(null);

type FileStoreProviderProps = {
  initialFile: File | (() => File);
} & Readonly<{ children: React.ReactNode }>;

const FileStoreProvider = ({
  initialFile,
  children,
}: FileStoreProviderProps) => {
  const [file, setFile] = useState(initialFile);
  return (
    <FileStoreContext value={{ file, setFile }}>{children}</FileStoreContext>
  );
};

const useFileStore = (): FileStore => {
  const fileStore = use(FileStoreContext);

  if (fileStore === null) {
    throw new Error("Missing FileStoreProvider in the tree");
  }

  return fileStore;
};

export { FileStoreProvider, useFileStore, type FileStore };
