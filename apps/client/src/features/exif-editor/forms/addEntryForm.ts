import { formOptions } from "@tanstack/react-form";
import { z } from "zod";

import { FormatSchema, IfdSchema, TagEntrySchema } from "#schemas/exif";

const addFormSchema = z.strictObject({
  ifd: IfdSchema,
  tagEntry: TagEntrySchema,
  format: FormatSchema,
  editor: z.enum(["string", "array"]),
  value: z.union([z.array(z.number()), z.string()]),
});

type AddFieldValues = Partial<z.infer<typeof addFormSchema>>;

const DEFAULT_FORM_VALUES: AddFieldValues = {
  ifd: "IFD_0",
  tagEntry: undefined,
  format: "UNDEFINED",
  editor: "string",
  value: "",
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
