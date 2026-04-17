import type { ExifEditorStoreActions } from "#hooks/useExifEditor";
import { EXIF_TAG_MAP } from "#lib/exif/exifTagMap";
import { newTypedArrayInFormat } from "#lib/exif/newTypedArrayInFormat";
import type { ExifEntryObject } from "#lib/exif/serializeExifData";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@exiftools/ui/components/Select";

const EnumValueCell = ({
  exifEntryObject,
  updateExifEntry,
  value,
}: {
  exifEntryObject: ExifEntryObject;
  value: string;
  updateExifEntry: ExifEditorStoreActions["updateExifEntry"];
}) => {
  if (!(exifEntryObject.tag in EXIF_TAG_MAP)) {
    throw new Error("Invalid tag was provided, expected mapped Exif tag");
  }

  const values = EXIF_TAG_MAP[exifEntryObject.tag]?.values;
  if (values === undefined) {
    throw new Error("Invalid tag was provided, expected enum");
  }

  if (!(value in values)) {
    throw new Error(
      `Invalid value was provided, received ${value}, expected one of ${Object.keys(values).join()}`,
    );
  }

  return (
    <Select
      value={value}
      onValueChange={(value) => {
        if (!(value in values) || values[value] === undefined) {
          throw new Error(
            `Invalid value was provided, received ${value}, expected one of ${Object.keys(values).join()}`,
          );
        }
        updateExifEntry(
          exifEntryObject,
          newTypedArrayInFormat([values[value]], exifEntryObject.format),
        );
      }}
    >
      <SelectTrigger>
        <SelectValue
          placeholder={`Select a value for ${exifEntryObject.tag}`}
        />
      </SelectTrigger>
      <SelectContent>
        {Object.keys(values).map((key) => (
          <SelectItem key={`${exifEntryObject.tag}-${key}`} value={key}>
            {key}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { EnumValueCell };
