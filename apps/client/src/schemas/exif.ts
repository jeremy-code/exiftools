import {
  ExifFormat,
  ExifIfd,
  ExifSupportLevel,
  ExifTagUnified,
} from "libexif-wasm";
import { z } from "zod";

const TagSchema = z.enum(Array.from(ExifTagUnified, ([key]) => key));

const SupportLevelSchema = z.enum(Array.from(ExifSupportLevel, ([key]) => key));

const IfdSchema = z.enum(
  Array.from(ExifIfd, ([key]) => key).filter((key) => key !== "COUNT"),
);

const TagEntrySchema = z.strictObject({
  tagVal: z.number().int(),
  tag: TagSchema,
  name: z.string(),
  title: z.string(),
  description: z.string(),
  esl: z.record(IfdSchema, SupportLevelSchema),
});

const FormatSchema = z.enum(Array.from(ExifFormat, ([key]) => key));

export {
  TagSchema,
  SupportLevelSchema,
  TagEntrySchema,
  IfdSchema,
  FormatSchema,
};
