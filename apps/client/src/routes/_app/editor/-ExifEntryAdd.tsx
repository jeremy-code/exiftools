import type { ComponentPropsWithRef } from "react";

import { useForm } from "@tanstack/react-form";
import {
  ExifFormat,
  getExifTagTable,
  type Format,
  type Ifd,
  type Tag,
} from "libexif-wasm";
import { IFD_NAMES } from "libexif-wasm/constants";

import { useExifEditorStoreContext } from "#hooks/useExifEditor";
import { Button } from "@exiftools/ui/components/Button";
import { Input } from "@exiftools/ui/components/Input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@exiftools/ui/components/Select";
import { Spinner } from "@exiftools/ui/components/Spinner";

type ExifEntryAddProps = ComponentPropsWithRef<"div">;

type FieldValues = {
  ifd: Ifd;
  tag: Tag;
  format: Format;
  value: string;
};

const EXIF_TAG_TABLE = getExifTagTable();

const DEFAULT_FORM_VALUES: FieldValues = {
  ifd: "IFD_0",
  tag: "USER_COMMENT",
  format: "UNDEFINED",
  value: "",
};

const ExifEntryAdd = (props: ExifEntryAddProps) => {
  const addExifEntry = useExifEditorStoreContext((state) => state.addExifEntry);
  const form = useForm({
    defaultValues: DEFAULT_FORM_VALUES,
    onSubmit: ({ value }) => {
      const { value: entryValue, ...exifEntryObject } = value;

      addExifEntry(exifEntryObject, entryValue);
    },
  });

  return (
    <div {...props}>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          void form.handleSubmit();
        }}
      >
        <form.Field
          name="ifd"
          children={(field) => (
            <Select
              value={field.state.value}
              onValueChange={(value) => {
                field.handleChange(value as FieldValues["ifd"]);
              }}
            >
              <SelectTrigger onBlur={field.handleBlur}>
                <SelectValue placeholder="Select an IFD" />
              </SelectTrigger>
              <SelectContent>
                {IFD_NAMES.map((ifdName) => (
                  <SelectItem key={ifdName} value={ifdName}>
                    {ifdName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <form.Field
          name="tag"
          children={(field) => (
            <Select
              value={field.state.value}
              onValueChange={(value) => {
                field.handleChange(value as FieldValues["tag"]);
              }}
            >
              <SelectTrigger onBlur={field.handleBlur}>
                <SelectValue placeholder="Select a tag" />
              </SelectTrigger>
              <SelectContent>
                {EXIF_TAG_TABLE.map((tagEntry) => (
                  <SelectItem
                    key={`${tagEntry.tag}-${tagEntry.tagVal}`}
                    value={tagEntry.tag}
                  >
                    {tagEntry.tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <form.Field
          name="format"
          children={(field) => (
            <Select
              value={field.state.value}
              onValueChange={(value) => {
                field.handleChange(value as FieldValues["format"]);
              }}
            >
              <SelectTrigger onBlur={field.handleBlur}>
                <SelectValue placeholder="Select a format" />
              </SelectTrigger>
              <SelectContent>
                {Array.from(ExifFormat).map(([format]) => (
                  <SelectItem key={format} value={format}>
                    {format}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />
        <form.Field
          name="value"
          children={(field) => (
            <Input
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
        <form.Subscribe
          selector={(state) => state.isSubmitting}
          children={(isSubmitting) => (
            <Button type="submit" variant="surface" disabled={isSubmitting}>
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
      </form>
    </div>
  );
};

export { ExifEntryAdd };
