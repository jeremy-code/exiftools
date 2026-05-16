import type { Dispatch, SetStateAction } from "react";

import { Minus, Plus } from "lucide-react";
import {
  Disclosure,
  type DisclosureProps,
  DisclosurePanel,
  Heading,
} from "react-aria-components/Disclosure";

import { EXIF_TAG_MAP } from "#lib/exif/exifTagMap";
import type { ExifEntryObject } from "#lib/exif/serializeExifData";
import { Button } from "@exifi/ui/components/Button";
import { NumberField } from "@exifi/ui/components/NumberField";

type ExifEntryEditorProps = {
  exifEntryObject: ExifEntryObject;
  draft: number[];
  setDraft: Dispatch<SetStateAction<number[]>>;
} & DisclosureProps;

const ExifEntryByteEditor = ({
  exifEntryObject,
  draft,
  setDraft,
  ...props
}: ExifEntryEditorProps) => {
  const isRationalOrSRational =
    exifEntryObject.format === "SRATIONAL" ||
    exifEntryObject.format === "RATIONAL";

  return (
    (exifEntryObject.format === "ASCII" ||
      isRationalOrSRational ||
      exifEntryObject.tag === "USER_COMMENT") && (
      <Disclosure {...props}>
        <Heading>
          <Button
            slot="trigger"
            className="group/collapsible-trigger"
            variant="outline"
          >
            <span className="group-aria-[expanded=false]/collapsible-trigger:hidden">
              Close byte editor
            </span>
            <span className="group-aria-expanded/collapsible-trigger:hidden">
              Open byte editor
            </span>
          </Button>
        </Heading>
        <DisclosurePanel className="mt-4">
          <div className="grid grid-cols-[repeat(auto-fit,minmax(60px,1fr))] gap-2">
            {draft.map((value, index) => (
              <NumberField
                key={index}
                value={value}
                onChange={(newValue) =>
                  setDraft((prevValue) => prevValue.with(index, newValue))
                }
                aria-label={`${exifEntryObject.tag} component ${index + 1}`}
              />
            ))}
          </div>
          <div className="mt-4 flex gap-2">
            {exifEntryObject.components !== 1 &&
              exifEntryObject.format !== "ASCII" && (
                <Button
                  size="icon"
                  onPress={() =>
                    setDraft((prev) =>
                      prev.slice(0, isRationalOrSRational ? -2 : -1),
                    )
                  }
                  aria-label="Remove component"
                >
                  <Minus size={16} />
                </Button>
              )}
            {exifEntryObject.components <
              (EXIF_TAG_MAP[exifEntryObject.tag]?.maxNumberOfComponents ??
                Infinity) &&
              exifEntryObject.format !== "ASCII" && (
                <Button
                  size="icon"
                  onPress={() => {
                    setDraft((prev) =>
                      prev.concat(isRationalOrSRational ? [0, 1] : [0]),
                    );
                  }}
                  aria-label="Add component"
                >
                  <Plus size={16} />
                </Button>
              )}
          </div>
        </DisclosurePanel>
      </Disclosure>
    )
  );
};

export { ExifEntryByteEditor };
