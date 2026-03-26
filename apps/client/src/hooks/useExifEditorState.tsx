import { createContext, use } from "react";

import { create, useStore } from "zustand";

import {
  type ExifDataObject,
  type ExifIfdObject,
} from "#lib/exif/serializeExifData";
import { encodeStringToUtf8 } from "#utils/encodeStringToUtf8";

type ExifEditorState = {
  exifDataObject: ExifDataObject;
  updateExifEntry: (
    ifd: keyof ExifIfdObject,
    index: number,
    value: string,
  ) => void;
};

type ExifEditorStateStore = ReturnType<typeof createExifEditorState>;

const createExifEditorState = (exifDataObject: ExifDataObject) => {
  return create<ExifEditorState>((set) => ({
    exifDataObject,
    updateExifEntry: (ifd, index, value) => {
      set((state) => {
        const exifTagToReplace = state.exifDataObject.ifd[ifd].at(index);
        if (exifTagToReplace === undefined) {
          return {};
        }
        // TODO: Handle other formats than ASCII
        if (exifTagToReplace.format === "ASCII") {
          const utf8Array = Array.from(encodeStringToUtf8(value));

          return {
            exifDataObject: {
              ...state.exifDataObject,
              ifd: {
                ...state.exifDataObject.ifd,
                [ifd]: state.exifDataObject.ifd[ifd]?.with(index, {
                  ...exifTagToReplace,
                  value,
                  data: utf8Array,
                  components: utf8Array.length,
                  size: utf8Array.length,
                }),
              },
            },
          };
        }
        return {};
      });
    },
  }));
};

const ExifEditorStateStoreContext = createContext<ExifEditorStateStore | null>(
  null,
);

const useExifEditorStateStore = <T,>(
  selector: (state: ExifEditorState) => T,
): T => {
  const exifEditorStateStore = use(ExifEditorStateStoreContext);

  if (exifEditorStateStore === null) {
    throw new Error("Missing ExifEditorStateStoreContext in the tree");
  }

  return useStore(exifEditorStateStore, selector);
};

export {
  createExifEditorState,
  type ExifEditorState,
  ExifEditorStateStoreContext,
  useExifEditorStateStore,
};
