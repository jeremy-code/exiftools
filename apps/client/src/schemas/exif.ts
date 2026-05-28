import {
  ExifFormat,
  ExifIfd,
  ExifSupportLevel,
  ExifTagUnified,
} from "libexif-wasm";
import { z } from "zod";

const TagSchema = z.enum(Array.from(ExifTagUnified, ([key]) => key));

const SupportLevelSchema = z.enum(Array.from(ExifSupportLevel, ([key]) => key));

const IfdSchema = z
  .enum(Array.from(ExifIfd, ([key]) => key))
  .exclude(["COUNT"]);

const TagEntrySchema = z.strictObject({
  tagVal: z.int().min(0).max(0xffff /* 16-bit integer tag */),
  tag: TagSchema,
  name: z.string().min(1),
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
