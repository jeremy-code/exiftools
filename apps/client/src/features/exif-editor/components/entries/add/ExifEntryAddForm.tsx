import type { ComponentPropsWithRef } from "react";

import { useForm } from "@tanstack/react-form";
import { ExifFormat, exifIfdGetName, getExifTagTable } from "libexif-wasm";
import { IFD_NAMES } from "libexif-wasm/constants";

import {
  addEntryFormOptions,
  addFormSchema,
  type AddFieldValues,
} from "#features/exif-editor/forms/addEntryForm";
import { useExifEditorStore } from "#features/exif-editor/hooks/useExifEditor";
import { EXIF_TAG_MAP } from "#lib/exif/exifTagMap";
import { decodeStringFromUtf8 } from "#utils/decodeStringFromUtf8";
import { encodeStringToUtf8 } from "#utils/encodeStringToUtf8";
import { titlecase } from "#utils/titlecase";
import { Button } from "@exifi/ui/components/Button";
import { ComboBox, ComboBoxItem } from "@exifi/ui/components/ComboBox";
import { Select, SelectItem } from "@exifi/ui/components/Select";
import { Spinner } from "@exifi/ui/components/Spinner";
import { TextField } from "@exifi/ui/components/TextField";

const EXIF_TAG_TABLE = getExifTagTable();

type ExifEntryAddFormProps = ComponentPropsWithRef<"form">;

const ExifEntryAddForm = (props: ExifEntryAddFormProps) => {
  const addExifEntry = useExifEditorStore((state) => state.addExifEntry);
  const addForm = useForm({
    ...addEntryFormOptions(),
    onSubmit: ({ value }) => {
      const {
        value: entryValue,
        tagEntry,
        ...exifEntryObject
      } = addFormSchema.parse(value);

      addExifEntry({ tag: tagEntry.tag, ...exifEntryObject }, entryValue);
    },
  });

  return (
    <form
      {...props}
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void addForm.handleSubmit();
      }}
    >
      <div className="flex flex-col gap-2">
        <addForm.Field
          name="tagEntry"
          children={(field) => (
            <ComboBox
              items={EXIF_TAG_TABLE.map((item, index) => ({
                id: index,
                ...item,
              }))}
              value={field.state.value?.index}
              onChange={(value) => {
                if (typeof value !== "number") {
                  return;
                }

                const tagEntry = EXIF_TAG_TABLE.at(value);
                if (tagEntry !== undefined) {
                  field.handleChange({ ...tagEntry, index: value });
                }
              }}
              onBlur={field.handleBlur}
              label="Tag"
              placeholder="ImageDescription"
              isRequired
            >
              {(item) => (
                <ComboBoxItem id={item.id} value={item}>
                  {item.name}
                </ComboBoxItem>
              )}
            </ComboBox>
          )}
        />
        <addForm.Field
          name="ifd"
          children={(field) => (
            <Select
              label="Image File Domain"
              value={field.state.value}
              onChange={(value) => {
                field.handleChange(value as AddFieldValues["ifd"]);
              }}
              placeholder="Select an IFD"
              onBlur={field.handleBlur}
              isRequired
            >
              {IFD_NAMES.map((ifdName) => (
                <addForm.Subscribe
                  key={ifdName}
                  selector={(state) => state.values.tagEntry?.esl}
                >
                  {(esl) => (
                    <SelectItem
                      id={ifdName}
                      isDisabled={
                        esl !== undefined &&
                        ["UNKNOWN", "NOT_RECORDED"].includes(esl[ifdName])
                      }
                    >
                      {`${exifIfdGetName(ifdName)}${
                        esl === undefined ? "" : ` (${titlecase(esl[ifdName])})`
                      }`}
                    </SelectItem>
                  )}
                </addForm.Subscribe>
              ))}
            </Select>
          )}
        />
        <addForm.Field
          name="format"
          children={(field) => (
            <Select
              label="Format"
              value={field.state.value}
              placeholder="Select a format"
              onChange={(value) => {
                field.handleChange(value as AddFieldValues["format"]);
              }}
              onBlur={field.handleBlur}
              isRequired
            >
              {Array.from(ExifFormat).map(([format]) => (
                <addForm.Subscribe
                  key={format}
                  selector={(state) => state.values.tagEntry?.tag}
                >
                  {(tag) => (
                    <SelectItem
                      id={format}
                      isDisabled={
                        tag !== undefined &&
                        tag in EXIF_TAG_MAP &&
                        !EXIF_TAG_MAP[tag]?.format.includes(format)
                      }
                    >
                      {format}
                    </SelectItem>
                  )}
                </addForm.Subscribe>
              ))}
            </Select>
          )}
        />
        <addForm.Field
          name="value"
          children={(field) => (
            <TextField
              label="Value"
              value={
                field.state.value === undefined ?
                  undefined
                : decodeStringFromUtf8(new Uint8Array(field.state.value))
              }
              onBlur={field.handleBlur}
              onChange={(fieldValue) => {
                field.handleChange(
                  fieldValue === "" ?
                    []
                  : Array.from(encodeStringToUtf8(fieldValue)),
                );
              }}
              isRequired
            />
          )}
        />
        <addForm.Subscribe
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
