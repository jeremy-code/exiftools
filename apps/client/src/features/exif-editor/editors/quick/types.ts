import type { Dayjs } from "dayjs";
import type { ValidTypedArray } from "libexif-wasm";

import type { ExifEntryObject } from "#lib/exif/serializeExifData";

type QuickEditorResolver = (
  entry: ExifEntryObject,
  onValueChange: (value: string | ValidTypedArray) => void,
) => QuickEditor | null;

type ResolvedQuickEditor<T> = {
  exifEntryObject: ExifEntryObject;
  value: T;
  onValueChange: (value: T) => void;
};

type ExifVersion = {
  major: number;
  minor: number;
};

type GpsVersionId = [number, number, number, number];

type QuickEditor =
  | ({ kind: "enum" } & ResolvedQuickEditor<string> & { values: string[] })
  | ({
      kind: "enumAscii";
    } & ResolvedQuickEditor<string> & { values: string[] })
  | ({ kind: "dateStamp" } & ResolvedQuickEditor<Dayjs>)
  | ({ kind: "versionId" } & ResolvedQuickEditor<GpsVersionId>)
  | ({ kind: "datetime" } & ResolvedQuickEditor<Dayjs>)
  | ({ kind: "ascii" } & ResolvedQuickEditor<string>)
  | ({ kind: "exifVersion" } & ResolvedQuickEditor<ExifVersion>)
  | ({ kind: "simpleNumeric" } & ResolvedQuickEditor<number>)
  | ({ kind: "timeStamp" } & ResolvedQuickEditor<Dayjs>);

export type { ExifVersion, QuickEditorResolver, QuickEditor };
