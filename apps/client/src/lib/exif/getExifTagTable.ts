import {
  EXIF_SENTINEL_TAG,
  ExifTagInfo,
  exifTagTableGetName,
  exifTagTableGetTag,
  type ExifIfdKey,
  type ExifSupportLevelKey,
  type ExifTagUnifiedKey,
} from "libexif-wasm";

type IfdKey = Exclude<ExifIfdKey, "COUNT">;

const IFD_KEYS = [
  "IFD_0",
  "IFD_1",
  "EXIF",
  "GPS",
  "INTEROPERABILITY",
] as const satisfies IfdKey[];

type ExifTag = {
  index: number;
  tagVal: number | null;
  tag: ExifTagUnifiedKey;
  name: string;
  supportLevel: Record<IfdKey, ExifSupportLevelKey>;
};

const DEFAULT_SUPPORT_LEVEL: ExifTag["supportLevel"] = {
  IFD_0: "UNKNOWN",
  IFD_1: "UNKNOWN",
  EXIF: "UNKNOWN",
  GPS: "UNKNOWN",
  INTEROPERABILITY: "UNKNOWN",
};

const getSupportLevel = (tag: ExifTagUnifiedKey): ExifTag["supportLevel"] => {
  return IFD_KEYS.reduce(
    (acc, ifd) => {
      const supportLevel = ExifTagInfo.getSupportLevelInIfd(
        tag,
        ifd,
        "UNKNOWN",
      );
      if (supportLevel === null) {
        throw new Error("Invalid support level");
      }
      acc[ifd] = supportLevel;
      return acc;
    },
    { ...DEFAULT_SUPPORT_LEVEL },
  );
};

const getExifTagTable = () => {
  const exifTagTable = Array.from({ length: EXIF_SENTINEL_TAG }, (_, index) => {
    const name = exifTagTableGetName(index);
    if (name === null) {
      throw new Error("Exif tag name was not found");
    }

    const tag = ExifTagInfo.fromName(name);
    if (tag === null) {
      throw new Error("Exif tag was not found from name");
    }

    return {
      index,
      tagVal: exifTagTableGetTag(index),
      tag,
      name,
      supportLevel: getSupportLevel(tag),
    };
  });

  return exifTagTable;
};

export { getExifTagTable, type ExifTag };
