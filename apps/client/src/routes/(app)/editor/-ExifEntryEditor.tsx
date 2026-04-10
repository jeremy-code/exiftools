import {
  useCallback,
  useMemo,
  useState,
  type ComponentPropsWithRef,
} from "react";

import {
  mapRationalToObject,
  type RationalObject,
  type ValidTypedArray,
} from "libexif-wasm";
import { cn } from "tailwind-variants";

import { RationalInput } from "#components/editor/RationalInput";
import { useExifEditorStoreContext } from "#hooks/useExifEditor";
import { getValueFromExifEntryObject } from "#lib/exif/getValueFromExifEntryObject";
import { newTypedArrayInFormat } from "#lib/exif/newTypedArrayInFormat";
import { type ExifEntryObject } from "#lib/exif/serializeExifData";
import { arrayEquals } from "#utils/arrayEquals";
import { decodeStringFromUtf8 } from "#utils/decodeStringFromUtf8";
import { encodeStringToUtf8 } from "#utils/encodeStringToUtf8";
import { Button } from "@exiftools/ui/components/Button";
import {
  DataList,
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
} from "@exiftools/ui/components/DataList";
import { Input, type InputProps } from "@exiftools/ui/components/Input";
import {
  Textarea,
  type TextareaProps,
} from "@exiftools/ui/components/Textarea";

type ExifEntryEditorProps = {
  exifEntryObject: ExifEntryObject;
};

const ValidityCheck = ({
  className,
  exifEntryObject,
  newValue,
  ...props
}: {
  exifEntryObject: ExifEntryObject;
  newValue: ValidTypedArray;
} & ComponentPropsWithRef<"span">) => {
  const expectedValue = getValueFromExifEntryObject({
    ...exifEntryObject,
    value: Array.from(newValue),
  });
  const isEmptyString = expectedValue === "";

  return (
    <span
      className={cn(
        { "text-muted-foreground italic": isEmptyString },
        className,
      )}
      {...props}
    >
      {!isEmptyString ? expectedValue : "(empty)"}
    </span>
  );
};

const ExifEntryValueEditor = ({
  value,
  setValue,
  ...props
}: {
  value: number;
  setValue: (value: number) => void;
} & Omit<InputProps, "value">) => {
  return (
    <Input
      {...props}
      type="number"
      value={value}
      onChange={(e) => {
        if (!Number.isNaN(e.target.valueAsNumber)) {
          setValue(e.target.valueAsNumber);
        } else if (e.target.value === "") {
          setValue(0);
        }
      }}
    />
  );
};

const ExifEntryAsciiValueEditor = ({
  value,
  setValue,
  ...props
}: {
  value: ValidTypedArray;
  setValue: (value: ValidTypedArray) => void;
} & Omit<TextareaProps, "value">) => {
  const asciiValue = useMemo(
    () => decodeStringFromUtf8(Uint8Array.from(value)),
    [value],
  );

  return (
    <Textarea
      {...props}
      value={asciiValue}
      onChange={(e) => {
        setValue(encodeStringToUtf8(e.target.value));
      }}
    />
  );
};

const ExifEntryEditor = ({ exifEntryObject }: ExifEntryEditorProps) => {
  const [newValue, setNewValue] = useState(() =>
    newTypedArrayInFormat(exifEntryObject.value, exifEntryObject.format),
  );
  const updateExifEntry = useExifEditorStoreContext(
    (state) => state.updateExifEntry,
  );

  const setNewValueAtIndex = useCallback((index: number) => {
    return (value: number) => {
      setNewValue((prevNewValue) => {
        return prevNewValue.with(index, value);
      });
    };
  }, []);

  const setRationalAtIndex = useCallback(
    (index: number) => {
      return (value: RationalObject | undefined) => {
        setNewValueAtIndex(index * 2)(value?.numerator ?? 0);
        setNewValueAtIndex(index * 2 + 1)(value?.denominator ?? 0);
      };
    },
    [setNewValueAtIndex],
  );

  const isChanged = useMemo(
    () => !arrayEquals(exifEntryObject.value, Array.from(newValue)),
    [newValue, exifEntryObject.value],
  );

  return (
    <div className="flex flex-col gap-8">
      <DataList orientation="vertical" variant="bold">
        <DataListItem>
          <DataListItemLabel>Tag</DataListItemLabel>
          <DataListItemValue>{exifEntryObject.tag}</DataListItemValue>
          <DataListItemLabel>Size</DataListItemLabel>
          <DataListItemValue>{exifEntryObject.size}</DataListItemValue>
          <DataListItemLabel>IFD</DataListItemLabel>
          <DataListItemValue>{exifEntryObject.ifd}</DataListItemValue>
          <DataListItemLabel>Value</DataListItemLabel>
          <DataListItemValue>
            {exifEntryObject.formattedValue}
          </DataListItemValue>
        </DataListItem>
      </DataList>
      <div>
        <p>Edit</p>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(--spacing(50),1fr))]">
          {(
            exifEntryObject.format === "RATIONAL" ||
            exifEntryObject.format === "SRATIONAL"
          ) ?
            mapRationalToObject(
              newTypedArrayInFormat(newValue, exifEntryObject.format),
            ).map((rationalObject, index) => (
              <RationalInput
                key={`${rationalObject.numerator}/${rationalObject.denominator}`}
                initialRational={rationalObject}
                setRational={setRationalAtIndex(index)}
              />
            ))
          : exifEntryObject.format === "ASCII" ?
            <ExifEntryAsciiValueEditor
              value={newValue}
              setValue={setNewValue}
            />
          : Array.from(newValue).map((value, index) => (
              <ExifEntryValueEditor
                key={index}
                value={value}
                setValue={setNewValueAtIndex(index)}
              />
            ))
          }
        </div>
      </div>
      <div>
        {"Expected change: "}
        {isChanged ?
          <ValidityCheck
            exifEntryObject={exifEntryObject}
            newValue={newValue}
          />
        : <span className="text-muted-foreground italic">no changes</span>}
      </div>
      <Button
        disabled={!isChanged}
        onClick={() => {
          updateExifEntry(exifEntryObject, newValue);
        }}
      >
        {isChanged ? "Save changes" : "Saved"}
      </Button>
    </div>
  );
};

export { ExifEntryEditor, type ExifEntryEditorProps };
