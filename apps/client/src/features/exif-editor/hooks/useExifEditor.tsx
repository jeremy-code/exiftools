import { createContext, use, useMemo } from "react";

import { imageDimensionsFromStream } from "image-dimensions";
import type { LatLng } from "leaflet";
import { ExifIfd, type ExifData, type ValidTypedArray } from "libexif-wasm";
import { create, useStore } from "zustand";

import { updateDateAndTimeDigitized } from "#lib/exif/actions/updateDateAndTimeDigitized";
import { updateGeolocationPosition } from "#lib/exif/actions/updateGeolocationPosition";
import { updateLatLng } from "#lib/exif/actions/updateLatLng";
import { updatePixelDimensions } from "#lib/exif/actions/updatePixelDimensions";
import { getOrInsertEntry } from "#lib/exif/getOrInsertEntry";
import {
  serializeExifData,
  type ExifDataObject,
  type ExifEntryObject,
} from "#lib/exif/serializeExifData";
import { encodeStringToUtf8 } from "#utils/encodeStringToUtf8";
import { isTypedArray } from "#utils/isTypedArray";

const getExifEntryFromExifEntryObject = (
  exifData: ExifData | null,
  exifEntryObject: ExifEntryObject,
) => {
  if (exifData === null) {
    throw new Error("Reference to ExifData instance not found");
  }
  const exifContent = exifData.ifd[ExifIfd[exifEntryObject.ifd]];
  const exifEntry = exifContent.getEntry(exifEntryObject.tag);

  if (exifEntry === null) {
    throw new Error(
      `Exif entry with tag ${exifEntryObject.tag} was not found.`,
    );
  }
  return exifEntry;
};

type ExifEditorStoreState = {
  exifDataObject: ExifDataObject;
};

type ExifEditorStoreActions = {
  updateExifEntry: (
    exifEntryObject: ExifEntryObject,
    value: string | ValidTypedArray,
  ) => void;
  removeExifEntry: (exifEntryObject: ExifEntryObject) => void;
  removeExifEntries: (exifEntryObjects: ExifEntryObject[]) => void;
  addExifEntry: (
    exifEntryObject: Partial<ExifEntryObject> &
      Pick<ExifEntryObject, "ifd" | "tag" | "format">,
    value: string | ValidTypedArray,
  ) => void;
  fix: () => void;
  updatePixelDimensions: (file: File) => Promise<void>;
  updateLatLng: (latLng: LatLng) => void;
  updateGeolocationPosition: (geoLocationPosition: GeolocationPosition) => void;
  updateDateAndTimeDigitized: () => void;
};

type ExifEditorStore = ExifEditorStoreState & ExifEditorStoreActions;

const useExifEditor = (exifData: ExifData) => {
  const exifDataObject = useMemo(() => serializeExifData(exifData), [exifData]);

  const exifEditorStore = useMemo(
    () =>
      create<ExifEditorStore>((set) => ({
        exifDataObject,
        updateExifEntry: (exifEntryObject, value) => {
          set(() => {
            const exifEntry = getExifEntryFromExifEntryObject(
              exifData,
              exifEntryObject,
            );
            if (exifEntry.format === "ASCII" && typeof value === "string") {
              const utf8Array = encodeStringToUtf8(value);
              exifEntry.data = utf8Array;
              exifEntry.components = utf8Array.length;
            } else {
              if (!isTypedArray(value)) {
                throw new Error("Non-ASCII entries expect a TypedArray value");
              }
              exifEntry.fromTypedArray(value);
            }

            return { exifDataObject: serializeExifData(exifData) };
          });
        },
        removeExifEntry: (exifEntryObject) => {
          set(() => {
            const exifEntry = getExifEntryFromExifEntryObject(
              exifData,
              exifEntryObject,
            );
            const exifContent = exifEntry.parent!; // Never null since entry must belong to an IFD
            exifContent.removeEntry(exifEntry);

            return { exifDataObject: serializeExifData(exifData) };
          });
        },
        removeExifEntries: (exifEntryObjects) => {
          set(() => {
            exifEntryObjects.forEach((exifEntryObject) => {
              const exifEntry = getExifEntryFromExifEntryObject(
                exifData,
                exifEntryObject,
              );
              const exifContent = exifEntry.parent!; // Never null since entry must belong to an IFD
              exifContent.removeEntry(exifEntry);
            });
            return { exifDataObject: serializeExifData(exifData) };
          });
        },
        addExifEntry: (exifEntryObject, value) => {
          set(() => {
            if (exifData === null) {
              throw new Error("Reference to ExifData instance not found");
            }
            const exifContent = exifData.ifd[ExifIfd[exifEntryObject.ifd]];
            const prevExifEntry = exifContent.getEntry(exifEntryObject.tag);
            if (prevExifEntry !== null) {
              throw new Error(
                `Exif entry with tag ${exifEntryObject.tag} already exists.`,
              );
            }
            const exifEntry = getOrInsertEntry(
              exifContent,
              exifEntryObject.tag,
            );
            exifEntry.format = exifEntryObject.format;
            if (
              exifEntryObject.format === "ASCII" &&
              typeof value === "string"
            ) {
              const utf8Array = encodeStringToUtf8(value);
              exifEntry.data = utf8Array;
              exifEntry.components = utf8Array.length;
            } else {
              if (!isTypedArray(value)) {
                throw new Error("Non-ASCII entries expect a TypedArray value");
              }
              exifEntry.fromTypedArray(value);
            }

            return { exifDataObject: serializeExifData(exifData) };
          });
        },
        fix: () => {
          set(() => {
            exifData.fix();

            return { exifDataObject: serializeExifData(exifData) };
          });
        },
        updatePixelDimensions: async (file: File) => {
          const imageDimensions = await imageDimensionsFromStream(
            file.stream(),
          );

          if (imageDimensions === undefined) {
            console.error("Failed to get image dimensions");
            return;
          }

          set(() => {
            updatePixelDimensions(exifData, imageDimensions);

            return { exifDataObject: serializeExifData(exifData) };
          });
        },
        updateLatLng: (latLng: LatLng) => {
          set(() => {
            updateLatLng(exifData, latLng);
            return { exifDataObject: serializeExifData(exifData) };
          });
        },
        updateGeolocationPosition: (geoLocationPosition) => {
          set(() => {
            updateGeolocationPosition(exifData, geoLocationPosition);
            return { exifDataObject: serializeExifData(exifData) };
          });
        },
        updateDateAndTimeDigitized: () => {
          set(() => {
            updateDateAndTimeDigitized(exifData);
            return { exifDataObject: serializeExifData(exifData) };
          });
        },
      })),
    [exifData, exifDataObject],
  );

  return exifEditorStore;
};

type ExifEditorStoreApi = ReturnType<typeof useExifEditor>;

const ExifEditorStoreContext = createContext<ExifEditorStoreApi | null>(null);

const useExifEditorStoreContext = <T,>(
  selector: (state: ExifEditorStore) => T,
): T => {
  const exifEditorStore = use(ExifEditorStoreContext);

  if (exifEditorStore === null) {
    throw new Error("Missing ExifEditorStateStoreContext in the tree");
  }

  return useStore(exifEditorStore, selector);
};

export {
  useExifEditor,
  type ExifEditorStore,
  type ExifEditorStoreState,
  type ExifEditorStoreActions,
  type ExifEditorStoreApi,
  ExifEditorStoreContext,
  useExifEditorStoreContext,
};
