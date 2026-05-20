import { createContext, use, useMemo } from "react";

import { imageDimensionsFromStream } from "image-dimensions";
import type { LatLng } from "leaflet";
import { ExifIfd, type ExifData, type ValidTypedArray } from "libexif-wasm";
import { create, useStore } from "zustand";

import { useExifData } from "#hooks/useExifData";
import { updateDateAndTimeDigitized } from "#lib/exif/actions/updateDateAndTimeDigitized";
import { updateGeolocationPosition } from "#lib/exif/actions/updateGeolocationPosition";
import { updateLatLng } from "#lib/exif/actions/updateLatLng";
import { updatePixelDimensions } from "#lib/exif/actions/updatePixelDimensions";
import { getOrInsertEntry } from "#lib/exif/getOrInsertEntry";
import { newTypedArrayInFormat } from "#lib/exif/newTypedArrayInFormat";
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
    value: string | ValidTypedArray | number[],
  ) => void;
  fix: () => void;
  updatePixelDimensions: (file: File) => Promise<void>;
  updateLatLng: (latLng: LatLng) => void;
  updateGeolocationPosition: (geoLocationPosition: GeolocationPosition) => void;
  updateDateAndTimeDigitized: () => void;
};

type ExifEditorStore = ExifEditorStoreState & ExifEditorStoreActions;

const createExifEditorStore = (
  exifData: ExifData,
  exifDataObject: ExifDataObject,
) =>
  create<ExifEditorStore>((set) => ({
    exifDataObject,
    updateExifEntry: (exifEntryObject, value) => {
      set(() => {
        const exifEntry = getExifEntryFromExifEntryObject(
          exifData,
          exifEntryObject,
        );
        const typedArray =
          typeof value === "string" ? encodeStringToUtf8(value)
          : isTypedArray(value) ? value
          : newTypedArrayInFormat(value, exifEntryObject.format);

        exifEntry.fromTypedArray(typedArray);

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
        const exifContent = exifData.ifd[ExifIfd[exifEntryObject.ifd]];
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
          : newTypedArrayInFormat(value, exifEntryObject.format);
        exifEntry.fromTypedArray(typedArray);

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
      const imageDimensions = await imageDimensionsFromStream(file.stream());

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
  }));

type ExifEditorStoreApi = ReturnType<typeof createExifEditorStore>;

const useExifEditor = (file: File) => {
  const exifData = useExifData(file);
  const exifDataObject = useMemo(() => serializeExifData(exifData), [exifData]);

  const exifEditorStore = useMemo(
    () => createExifEditorStore(exifData, exifDataObject),
    [exifData, exifDataObject],
  );

  return {
    exifData,
    exifEditorStore,
  };
};

const ExifEditorContext = createContext<ReturnType<
  typeof useExifEditor
> | null>(null);

const useExifEditorContext = () => {
  const exifEditorContext = use(ExifEditorContext);

  if (exifEditorContext === null) {
    throw new Error("Missing ExifEditorContext in the tree");
  }

  return exifEditorContext;
};

const useExifEditorStore = <T,>(selector: (state: ExifEditorStore) => T): T =>
  useStore(useExifEditorContext().exifEditorStore, selector);

export {
  useExifEditor,
  type ExifEditorStore,
  type ExifEditorStoreState,
  type ExifEditorStoreActions,
  type ExifEditorStoreApi,
  ExifEditorContext,
  useExifEditorContext,
  useExifEditorStore,
};
