import { ExifIfd, type ExifData, type ValidTypedArray } from "libexif-wasm";
import { create } from "zustand";

import {
  type ExifDataObject,
  type ExifEntryObject,
} from "#lib/exif/interfaces";
import { serializeExifData } from "#lib/exif/serializeExifData";
import { getEntryFromEntryObject } from "#lib/exif/utils/getEntryFromEntryObject";
import { getOrInsertEntry } from "#lib/exif/utils/getOrInsertEntry";
import { typedArrayInFormat } from "#lib/exif/utils/typedArrayInFormat";
import { encodeStringToUtf8 } from "#utils/encodeStringToUtf8";
import { isTypedArray } from "#utils/isTypedArray";

type ExifEditorStoreState = {
  exifData: ExifData;
  exifDataObject: ExifDataObject;
};

type ExifEditorStoreActions = {
  setExifData: (exifData: ExifData) => void;
  updateExifEntry: (
    exifEntryObject: ExifEntryObject,
    value: string | ValidTypedArray,
  ) => void;
  removeExifEntries: (exifEntryObjects: ExifEntryObject[]) => void;
  addExifEntry: (
    exifEntryObject: Partial<ExifEntryObject> &
      Pick<ExifEntryObject, "ifd" | "tag" | "format">,
    value: string | ValidTypedArray | number[],
  ) => void;
};

type ExifEditorStore = ExifEditorStoreState & ExifEditorStoreActions;

const createExifEditorStore = (exifData: ExifData) =>
  create<ExifEditorStore>((set) => ({
    exifData,
    exifDataObject: serializeExifData(exifData),
    setExifData: (exifData) => {
      set({ exifData, exifDataObject: serializeExifData(exifData) });
    },
    updateExifEntry: (exifEntryObject, value) => {
      set((state) => {
        const exifEntry = getEntryFromEntryObject(
          state.exifData,
          exifEntryObject,
        );
        const typedArray =
          typeof value === "string" ? encodeStringToUtf8(value)
          : isTypedArray(value) ? value
          : typedArrayInFormat(value, exifEntryObject.format);

        exifEntry.fromTypedArray(typedArray);

        return { exifDataObject: serializeExifData(exifData) };
      });
    },
    removeExifEntries: (exifEntryObjects) => {
      set((state) => {
        exifEntryObjects.forEach((exifEntryObject) => {
          const exifEntry = getEntryFromEntryObject(
            state.exifData,
            exifEntryObject,
          );
          const exifContent = exifEntry.parent!; // Never null since entry must belong to an IFD
          exifContent.removeEntry(exifEntry);
        });
        return { exifDataObject: serializeExifData(exifData) };
      });
    },
    addExifEntry: (exifEntryObject, value) => {
      set((state) => {
        const exifContent = state.exifData.ifd[ExifIfd[exifEntryObject.ifd]];
        const prevExifEntry = exifContent.getEntry(exifEntryObject.tag);
        if (prevExifEntry !== null) {
          console.warn(
            `Exif entry with tag ${exifEntryObject.tag} already exists and will be overwritten.`,
          );
        }
        const exifEntry = getOrInsertEntry(exifContent, exifEntryObject.tag);
        exifEntry.format = exifEntryObject.format;
        const typedArray =
          typeof value === "string" ? encodeStringToUtf8(value)
          : isTypedArray(value) ? value
          : typedArrayInFormat(value, exifEntryObject.format);
        exifEntry.fromTypedArray(typedArray);

        return { exifDataObject: serializeExifData(exifData) };
      });
    },
  }));

type ExifEditorStoreApi = ReturnType<typeof createExifEditorStore>;

export {
  type ExifEditorStore,
  type ExifEditorStoreState,
  type ExifEditorStoreActions,
  type ExifEditorStoreApi,
  createExifEditorStore,
};
