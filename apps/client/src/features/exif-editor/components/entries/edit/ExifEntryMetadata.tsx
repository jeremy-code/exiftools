import {
  ExifTagInfo,
  exifIfdGetName,
  exifFormatGetName,
  exifFormatGetSize,
  exifSupportLevelGetName,
} from "libexif-wasm";
import { ChevronDown } from "lucide-react";
import { useLocale } from "react-aria/I18nProvider";
import {
  Disclosure,
  type DisclosureProps,
  DisclosurePanel,
  Heading,
} from "react-aria-components/Disclosure";

import type { ExifEntryObject } from "#lib/exif/serializeExifData";
import { getExifEntryObjectLabel } from "#lib/exif/utils/getExifEntryObjectLabel";
import { formatPlural } from "#utils/format/formatPlural";
import { Button } from "@exifi/ui/components/Button";
import {
  DataList,
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
} from "@exifi/ui/components/DataList";

type ExifEntryMetadataProps = {
  exifEntryObject: ExifEntryObject;
} & DisclosureProps;

const ExifEntryMetadata = ({
  exifEntryObject,
  ...props
}: ExifEntryMetadataProps) => {
  const { locale } = useLocale();

  return (
    <Disclosure {...props}>
      <DataList orientation="horizontal" variant="bold">
        <DataListItem>
          <DataListItemLabel className="min-w-50">Tag</DataListItemLabel>
          <DataListItemValue>
            {getExifEntryObjectLabel(exifEntryObject)}
          </DataListItemValue>
        </DataListItem>
        <DataListItem>
          <DataListItemLabel className="min-w-50">Value</DataListItemLabel>
          <DataListItemValue>
            {exifEntryObject.formattedValue}
          </DataListItemValue>
        </DataListItem>
        <DisclosurePanel>
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
                {exifSupportLevelGetName(
                  ExifTagInfo.getSupportLevelInIfd(
                    exifEntryObject.tag,
                    exifEntryObject.ifd,
                  ),
                )}
              </DataListItemValue>
            </DataListItem>
            <DataListItem>
              <DataListItemLabel className="min-w-50">Format</DataListItemLabel>
              <DataListItemValue>
                {`${exifFormatGetName(exifEntryObject.format)} (${formatPlural(
                  exifFormatGetSize(exifEntryObject.format),
                  { one: " byte", other: " bytes" },
                  locale,
                )})`}
              </DataListItemValue>
            </DataListItem>
            <DataListItem>
              <DataListItemLabel className="min-w-50">
                Components
              </DataListItemLabel>
              <DataListItemValue>
                {`${formatPlural(
                  exifEntryObject.components,
                  {
                    one: " component",
                    other: " components",
                  },
                  locale,
                )} (${formatPlural(
                  exifEntryObject.size,
                  {
                    one: " byte",
                    other: " bytes",
                  },
                  locale,
                )} in total)`}
              </DataListItemValue>
            </DataListItem>
          </DataList>
        </DisclosurePanel>
      </DataList>
      <Heading>
        <Button
          slot="trigger"
          className="group/collapsible-trigger mt-4"
          variant="muted"
        >
          <ChevronDown
            size={16}
            className="transition-transform group-aria-expanded/collapsible-trigger:rotate-180"
          />
          <span className="group-aria-[expanded=false]/collapsible-trigger:hidden">
            See less
          </span>
          <span className="group-aria-expanded/collapsible-trigger:hidden">
            See more
          </span>
        </Button>
      </Heading>
    </Disclosure>
  );
};

export { ExifEntryMetadata, type ExifEntryMetadataProps };
