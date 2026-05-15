import type { ComponentPropsWithRef } from "react";

import { useForm } from "@tanstack/react-form";
import {
  ExifFormat,
  getExifTagTable,
  type Format,
  type Ifd,
  type TagEntry,
} from "libexif-wasm";
import { IFD_NAMES } from "libexif-wasm/constants";

import { useExifEditorStoreContext } from "#features/exif-editor/hooks/useExifEditor";
import { EXIF_TAG_MAP } from "#lib/exif/exifTagMap";
import { Button } from "@exifi/ui/components/Button";
import { ComboBox, ComboBoxItem } from "@exifi/ui/components/ComboBox";
import { Select, SelectItem } from "@exifi/ui/components/Select";
import { Spinner } from "@exifi/ui/components/Spinner";
import { TextField } from "@exifi/ui/components/TextField";

type FieldValues = {
  ifd: Ifd;
  tagEntry: TagEntry | null;
  format: Format;
  value: string;
};

const EXIF_TAG_TABLE = getExifTagTable();

const DEFAULT_FORM_VALUES: FieldValues = {
  ifd: "IFD_0",
  tagEntry: null,
  format: "UNDEFINED",
  value: "",
};

type ExifEntryAddFormProps = ComponentPropsWithRef<"form">;

const ExifEntryAddForm = (props: ExifEntryAddFormProps) => {
  const addExifEntry = useExifEditorStoreContext((state) => state.addExifEntry);
  const form = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    onSubmit: ({ value }) => {
      if (value.tagEntry !== null) {
        const { value: entryValue, tagEntry, ...exifEntryObject } = value;

        addExifEntry({ tag: tagEntry.tag, ...exifEntryObject }, entryValue);
      }
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
          validators={{
            onSubmit: ({ value }) =>
              value === null ? "Tag must be defined" : undefined,
          }}
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
                if (
                  typeof value === "string" &&
                  IFD_NAMES.includes(value as Ifd)
                ) {
                  field.handleChange(value as Ifd);
                }
              }}
              placeholder="Select an IFD"
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
            >
              <form.Subscribe selector={(state) => state.values.tagEntry?.tag}>
                {(tag) =>
                  typeof tag === "string" && tag in EXIF_TAG_MAP ?
                    EXIF_TAG_MAP[tag]?.format.map((format) => (
                      <SelectItem key={format} textValue={format}>
                        {format}
                      </SelectItem>
                    ))
                  : Array.from(ExifFormat).map(([format]) => (
                      <SelectItem key={format} textValue={format}>
                        {format}
                      </SelectItem>
                    ))
                }
              </form.Subscribe>
            </Select>
          )}
        />
        <form.Field
          name="value"
          children={(field) => (
            <TextField
              label="Value"
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(value) => field.handleChange(value)}
            />
          )}
        />
        <form.Subscribe
          selector={(state) => state.isSubmitting}
          children={(isSubmitting) => (
            <Button type="submit" variant="surface" isDisabled={isSubmitting}>
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
