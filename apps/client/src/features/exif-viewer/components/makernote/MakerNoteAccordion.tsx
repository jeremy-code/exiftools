import type { ExifData } from "libexif-wasm";

import { formatPlural } from "#utils/formatPlural";
import {
  DataList,
  DataListItem,
  DataListItemLabel,
  DataListItemValue,
} from "@exifi/ui/components/DataList";
import {
  Accordion,
  AccordionPanel,
  AccordionItem,
  AccordionHeader,
} from "@exifi/ui/components2/Accordion";
import { Badge } from "@exifi/ui/components2/Badge";
import {
  TooltipTrigger,
  TooltipTarget,
  Tooltip,
} from "@exifi/ui/components2/Tooltip";

const MakerNoteAccordion = ({ exifData }: { exifData: ExifData }) => {
  const mnoteData = exifData.mnoteData;

  if (mnoteData === null) {
    return null;
  }

  return (
    <Accordion
      expandedKeys={["MAKERNOTE"]}
      variant="enclosed"
      allowsMultipleExpanded
      size="lg"
      className="shadow-sm"
    >
      <AccordionItem id="MAKERNOTE">
        <AccordionHeader>
          <div className="flex gap-2">
            Makernote
            <Badge>
              {formatPlural(mnoteData.dataCount, {
                one: " tag",
                other: " tags",
              })}
            </Badge>
          </div>
        </AccordionHeader>
        <AccordionPanel>
          <DataList variant="bold">
            {mnoteData.data.map((mnoteDatum, index) => (
              <DataListItem
                className="flex-col! md:flex-row!"
                key={index} // id is not unique
              >
                <DataListItemLabel className="md:w-1/3">
                  {(
                    mnoteDatum.description !== null &&
                    mnoteDatum.description !== ""
                  ) ?
                    <TooltipTrigger>
                      <TooltipTarget>
                        <span role="button">{mnoteDatum.title}</span>
                      </TooltipTarget>
                      <Tooltip>{mnoteDatum.description}</Tooltip>
                    </TooltipTrigger>
                  : (mnoteDatum.title ??
                    mnoteDatum.name ??
                    `ID ${mnoteDatum.id} (${index})`)
                  }
                </DataListItemLabel>
                <DataListItemValue className="relative before:relative before:left-0 before:pr-1.5 before:text-muted-foreground before:content-['=']">
                  {mnoteDatum.value}
                </DataListItemValue>
              </DataListItem>
            ))}
          </DataList>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export { MakerNoteAccordion };
