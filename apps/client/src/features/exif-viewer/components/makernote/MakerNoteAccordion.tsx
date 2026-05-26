import type { ExifData } from "libexif-wasm";

import { Accordion } from "@exifi/ui/components/Accordion";

import { MakerNoteAccordionItem } from "./MakerNoteAccordionItem";

const MakerNoteAccordion = ({ exifData }: { exifData: ExifData }) => {
  const mnoteData = exifData.mnoteData;

  if (mnoteData === null) {
    return null;
  }

  return (
    <Accordion
      defaultExpandedKeys={["MAKERNOTE"]}
      variant="enclosed"
      allowsMultipleExpanded
      className="shadow-sm"
    >
      <MakerNoteAccordionItem mnoteData={mnoteData} />
    </Accordion>
  );
};

export { MakerNoteAccordion };
