import type { ComponentPropsWithRef } from "react";

import { useForm } from "@tanstack/react-form";
import { ExifFormat, getExifTagTable, type TagEntry } from "libexif-wasm";
import { IFD_NAMES } from "libexif-wasm/constants";
import { z } from "zod";

import { useExifEditorStore } from "#features/exif-editor/hooks/useExifEditor";
import { EXIF_TAG_MAP } from "#lib/exif/exifTagMap";
import { FormatSchema, IfdSchema, TagEntrySchema } from "#schemas/exif";
import { titlecase } from "#utils/titlecase";
import { Button } from "@exifi/ui/components/Button";
import { ComboBox, ComboBoxItem } from "@exifi/ui/components/ComboBox";
import { Select, SelectItem } from "@exifi/ui/components/Select";
import { Spinner } from "@exifi/ui/components/Spinner";
import { TextField } from "@exifi/ui/components/TextField";

const textDecoder = new TextDecoder();

const addFormSchema = z.strictObject({
  ifd: IfdSchema,
  tagEntry: TagEntrySchema,
  format: FormatSchema,
  editor: z.enum(["string", "array"]),
  value: z.union([z.array(z.number()), z.string()]),
});

const _partialAddFormSchema = addFormSchema.partial();

type FieldValues = z.infer<typeof _partialAddFormSchema>;

const EXIF_TAG_TABLE = getExifTagTable();

const DEFAULT_FORM_VALUES: FieldValues = {
  ifd: "IFD_0",
  tagEntry: undefined,
  format: "UNDEFINED",
  editor: "string",
  value: "",
};

type ExifEntryAddFormProps = ComponentPropsWithRef<"form">;

const ExifEntryAddForm = (props: ExifEntryAddFormProps) => {
  const addExifEntry = useExifEditorStore((state) => state.addExifEntry);
  const form = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    validators: {
      onSubmit: addFormSchema,
    },
    onSubmit: ({ value }) => {
      const parsedSchema = addFormSchema.safeParse(value);
      if (!parsedSchema.success) {
        throw new Error(parsedSchema.error.message);
      }

      const {
        value: entryValue,
        tagEntry,
        ...exifEntryObject
      } = parsedSchema.data;

      addExifEntry({ tag: tagEntry.tag, ...exifEntryObject }, entryValue);
    },
  });

  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-2">
        <form.Field
          name="tagEntry"
          children={(field) => (
            <ComboBox
              items={EXIF_TAG_TABLE}
              value={field.state.value?.tag}
              onChange={(value) => {
                const tagEntry = EXIF_TAG_TABLE.find(
                  (item) => item.tag === value,
                );

                if (tagEntry !== undefined) {
                  field.handleChange(tagEntry);
                }
              }}
              onBlur={field.handleBlur}
              label="Tag"
              placeholder="ImageDescription"
            >
              {(item: TagEntry) => (
                <ComboBoxItem key={item.tag} id={item.tag} value={item}>
                  {item.name}
                </ComboBoxItem>
              )}
            </ComboBox>
          )}
        />
        <form.Field
          name="ifd"
          children={(field) => (
            <Select
              label="Image File Domain"
              value={field.state.value}
              onChange={(value) => {
                field.handleChange(value as FieldValues["ifd"]);
              }}
              placeholder="Select an IFD"
              onBlur={field.handleBlur}
            >
              {IFD_NAMES.map((ifdName) => (
                <SelectItem key={ifdName} textValue={ifdName}>
                  {ifdName}{" "}
                  <form.Subscribe
                    selector={(state) => state.values.tagEntry?.esl}
                  >
                    {(esl) => (esl === undefined ? null : esl[ifdName])}
                  </form.Subscribe>
                </SelectItem>
              ))}
            </Select>
          )}
        />
        <form.Field
          name="format"
          children={(field) => (
            <Select
              label="Format"
              value={field.state.value}
              placeholder="Select a format"
              onChange={(value) => {
                field.handleChange(value as FieldValues["format"]);
              }}
              onBlur={field.handleBlur}
            >
              <form.Subscribe selector={(state) => state.values.tagEntry?.tag}>
                {(tag) =>
                  typeof tag === "string" && tag in EXIF_TAG_MAP ?
                    EXIF_TAG_MAP[tag]?.format.map((format) => (
                      <SelectItem key={format} id={format}>
                        {format}
                      </SelectItem>
                    ))
                  : Array.from(ExifFormat).map(([format]) => (
                      <SelectItem key={format} id={format}>
                        {format}
                      </SelectItem>
                    ))
                }
              </form.Subscribe>
            </Select>
          )}
        />

        <form.Field
          name="editor"
          children={(field) => (
            <Select
              label="Editor"
              value={field.state.value}
              placeholder="Select an editor"
              onChange={(value) => {
                field.handleChange(value as FieldValues["editor"]);
              }}
              onBlur={field.handleBlur}
            >
              {["string", "array"].map((editor) => (
                <SelectItem key={editor} id={editor}>
                  {titlecase(editor)}
                </SelectItem>
              ))}
            </Select>
          )}
        />

        <form.Subscribe
          selector={(state) => state.values.editor}
          children={(editor) => {
            if (editor === "string") {
              return (
                <form.Field
                  name="value"
                  children={(field) => (
                    <TextField
                      label="Value"
                      value={
                        field.state.value === undefined ? undefined
                        : typeof field.state.value === "string" ?
                          field.state.value
                        : textDecoder.decode(new Uint8Array(field.state.value))
                      }
                      onBlur={field.handleBlur}
                      onChange={field.handleChange}
                    />
                  )}
                />
              );
            }
            // TODO: Not implemented
            return null;
          }}
        />

        <form.Subscribe
          selector={(state) => state.isSubmitting}
          children={(isSubmitting) => (
            <Button
              className="mt-4 self-end px-8"
              type="submit"
              variant="surface"
              isDisabled={isSubmitting}
            >
              {isSubmitting && <Spinner className="absolute" />}
              <span
                className="data-[pending=true]:invisible"
                data-pending={isSubmitting}
              >
                Submit
              </span>
            </Button>
          )}
        />
      </div>
    </form>
  );
};

export { ExifEntryAddForm, type ExifEntryAddFormProps };
