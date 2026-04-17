import {
  useCallback,
  useMemo,
  useState,
  type ComponentPropsWithRef,
} from "react";

import {
  exifFormatGetName,
  exifFormatGetSize,
  exifIfdGetName,
  mapRationalToObject,
  ExifTagInfo,
  type RationalObject,
  type ValidTypedArray,
} from "libexif-wasm";
import { ChevronDown, Minus, Plus } from "lucide-react";
import { cn } from "tailwind-variants";

import { AsciiTextarea } from "#components/editor/AsciiTextarea";
import { NumberInput } from "#components/editor/NumberInput";
import { RationalInput } from "#components/editor/RationalInput";
import { useExifEditorStoreContext } from "#hooks/useExifEditor";
import { EXIF_TAG_MAP } from "#lib/exif/exifTagMap";
import { getValueFromExifEntryObject } from "#lib/exif/getValueFromExifEntryObject";
import { newTypedArrayInFormat } from "#lib/exif/newTypedArrayInFormat";
import { type ExifEntryObject } from "#lib/exif/serializeExifData";
import { arrayLikeEquals } from "#utils/arrayLikeEquals";
import { formatPlural } from "#utils/formatPlural";
import { Button } from "@exiftools/ui/components/Button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@exiftools/ui/components/Collapsible";
import {
  DataList,
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
} from "@exiftools/ui/components/DataList";

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

const supportLevelMap = {
  MANDATORY: "Mandatory",
  UNKNOWN: "Unknown",
  NOT_RECORDED: "Not recorded",
  OPTIONAL: "Optional",
};

type ExifEntryEditorProps = {
  exifEntryObject: ExifEntryObject;
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
      setNewValue((prevNewValue) => prevNewValue.with(index, value));
    };
  }, []);

  const setRationalAtIndex = useCallback((index: number) => {
    return (value: RationalObject) => {
      setNewValue((prevNewValue) => {
        const newNewValue = prevNewValue.slice();
        newNewValue.set([value.numerator, value.denominator], index * 2);
        return newNewValue;
      });
    };
  }, []);

  const isChanged = useMemo(
    () => !arrayLikeEquals(exifEntryObject.value, newValue),
    [newValue, exifEntryObject.value],
  );
  const [isByteEditorOpen, setIsByteEditorOpen] = useState(false);
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const isRationalOrSRational =
    exifEntryObject.format === "RATIONAL" ||
    exifEntryObject.format === "SRATIONAL";
  const maxNumberOfComponents =
    EXIF_TAG_MAP[exifEntryObject.tag]?.maxNumberOfComponents;

  return (
    <div className="flex flex-col gap-8">
      <Collapsible
        open={isInfoOpen}
        onOpenChange={(open) => setIsInfoOpen(open)}
      >
        <DataList orientation="horizontal" variant="bold">
          <DataListItem>
            <DataListItemLabel className="min-w-50">Tag</DataListItemLabel>
            <DataListItemValue>
              {ExifTagInfo.getTitleInIfd(
                exifEntryObject.tag,
                exifEntryObject.ifd,
              )}
            </DataListItemValue>
          </DataListItem>
          <DataListItem>
            <DataListItemLabel className="min-w-50">Value</DataListItemLabel>
            <DataListItemValue>
              {exifEntryObject.formattedValue}
            </DataListItemValue>
          </DataListItem>
          <CollapsibleContent>
            <DataList>
              <DataListItem>
                <DataListItemLabel className="min-w-50">
                  Tag description
                </DataListItemLabel>
                <DataListItemValue>
                  {ExifTagInfo.getDescriptionInIfd(
                    exifEntryObject.tag,
                    exifEntryObject.ifd,
                  )}
                </DataListItemValue>
              </DataListItem>
              <DataListItem>
                <DataListItemLabel className="min-w-50">
                  Image File Directory
                </DataListItemLabel>
                <DataListItemValue>
                  {exifIfdGetName(exifEntryObject.ifd)}
                </DataListItemValue>
              </DataListItem>
              <DataListItem>
                <DataListItemLabel className="min-w-50">
                  Support level
                </DataListItemLabel>
                <DataListItemValue>
                  {
                    supportLevelMap[
                      ExifTagInfo.getSupportLevelInIfd(
                        exifEntryObject.tag,
                        exifEntryObject.ifd,
                      )
                    ]
                  }
                </DataListItemValue>
              </DataListItem>
              <DataListItem>
                <DataListItemLabel className="min-w-50">
                  Format
                </DataListItemLabel>
                <DataListItemValue>
                  {exifFormatGetName(exifEntryObject.format)} (
                  {formatPlural(exifFormatGetSize(exifEntryObject.format), {
                    one: " byte",
                    other: " bytes",
                  })}
                  )
                </DataListItemValue>
              </DataListItem>
              <DataListItem>
                <DataListItemLabel className="min-w-50">
                  Components
                </DataListItemLabel>
                <DataListItemValue>
                  {formatPlural(exifEntryObject.components, {
                    one: " component",
                    other: " components",
                  })}
                  {" ("}
                  {formatPlural(exifEntryObject.size, {
                    one: " byte",
                    other: " bytes",
                  })}
                  {" in total)"}
                </DataListItemValue>
              </DataListItem>
            </DataList>
          </CollapsibleContent>
        </DataList>
        <CollapsibleTrigger asChild>
          <Button className="mt-4" variant="muted">
            <ChevronDown
              className="transition-transform data-[open=true]:rotate-180"
              data-open={isInfoOpen}
            />
            {isInfoOpen ? "See less" : "See more"}
          </Button>
        </CollapsibleTrigger>
      </Collapsible>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
        {isRationalOrSRational ?
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
          <AsciiTextarea value={newValue} setValue={setNewValue} />
        : Array.from(newValue).map((value, index) => (
            <NumberInput
              key={index}
              value={value}
              setValue={setNewValueAtIndex(index)}
            />
          ))
        }
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
      {(exifEntryObject.format === "ASCII" ||
        exifEntryObject.format === "RATIONAL" ||
        exifEntryObject.format === "SRATIONAL") && (
        <Collapsible
          open={isByteEditorOpen}
          onOpenChange={(open) => setIsByteEditorOpen(open)}
        >
          <CollapsibleTrigger asChild>
            <Button variant="outline">
              {isByteEditorOpen ? "Close byte editor" : "Open byte editor"}
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="mt-4">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4">
              {Array.from(newValue).map((value, index) => (
                <NumberInput
                  key={index}
                  value={value}
                  setValue={setNewValueAtIndex(index)}
                />
              ))}
            </div>
            <div className="mt-4 flex gap-2">
              {exifEntryObject.components !== 1 &&
                exifEntryObject.format !== "ASCII" && (
                  <Button
                    size="icon"
                    onClick={() => {
                      setNewValue((prev) =>
                        newTypedArrayInFormat(
                          Array.from(prev).slice(
                            0,
                            isRationalOrSRational ? -2 : -1,
                          ),
                          exifEntryObject.format,
                        ),
                      );
                    }}
                  >
                    <Minus size={16} />
                  </Button>
                )}
              {(maxNumberOfComponents === undefined ||
                exifEntryObject.components < maxNumberOfComponents) &&
                exifEntryObject.format !== "ASCII" && (
                  <Button
                    size="icon"
                    onClick={() => {
                      setNewValue((prev) =>
                        newTypedArrayInFormat(
                          isRationalOrSRational ?
                            Array.from(prev).concat([0, 1])
                          : Array.from(prev).concat([0]),
                          exifEntryObject.format,
                        ),
                      );
                    }}
                  >
                    <Plus size={16} />
                  </Button>
                )}
            </div>
          </CollapsibleContent>
        </Collapsible>
      )}

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
