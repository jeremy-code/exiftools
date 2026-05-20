import { formOptions } from "@tanstack/react-form";
import { exifTagTableCount } from "libexif-wasm";
import { z } from "zod";

import { FormatSchema, IfdSchema, TagEntrySchema } from "#schemas/exif";

const addFormSchema = z.strictObject({
  ifd: IfdSchema,
  tagEntry: TagEntrySchema.extend({
    index: z.number().min(0).max(exifTagTableCount()),
  }),
  format: FormatSchema,
  value: z.array(z.number()),
});

type AddFormSchema = z.infer<typeof addFormSchema>;
type AddFieldValues = Partial<AddFormSchema> & Pick<AddFormSchema, "value">;

const DEFAULT_FORM_VALUES: AddFieldValues = {
  ifd: undefined,
  tagEntry: undefined,
  format: undefined,
  value: [],
};

const addEntryFormOptions = () =>
  formOptions({
    defaultValues: DEFAULT_FORM_VALUES,
    validators: {
      onSubmit: addFormSchema,
    },
  });

export {
  addFormSchema,
  type AddFieldValues,
  DEFAULT_FORM_VALUES,
  addEntryFormOptions,
};
