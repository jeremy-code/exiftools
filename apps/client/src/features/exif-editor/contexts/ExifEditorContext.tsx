import { createContext, use, type ReactNode } from "react";

import type { ExifData } from "libexif-wasm";
import { useStore } from "zustand";

import {
  createExifEditorStore,
  type ExifEditorStore,
  type ExifEditorStoreApi,
} from "../stores/exifEditorStore";

type ExifEditorType = ExifEditorStoreApi;

const ExifEditorContext = createContext<ExifEditorType | null>(null);

type ExifEditorProviderProps = {
  exifData: ExifData;
} & Readonly<{ children: ReactNode }>;

const ExifEditorProvider = ({
  exifData,
  children,
}: ExifEditorProviderProps) => {
  const exifEditorStore = createExifEditorStore(exifData);
  return (
    <ExifEditorContext value={exifEditorStore}>{children}</ExifEditorContext>
  );
};

const useExifEditor = <T,>(selector: (state: ExifEditorStore) => T): T => {
  const context = use(ExifEditorContext);
  if (context === null) {
    throw new Error("Missing ExifEntryDraftContext in the tree");
  }

  return useStore(context, selector);
};

export {
  ExifEditorProvider,
  useExifEditor,
  type ExifEditorContext,
  type ExifEditorType,
};
