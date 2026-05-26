import type { ExifData, Ifd } from "libexif-wasm";

import { Accordion } from "@exifi/ui/components/Accordion";

import { IfdAccordionItem } from "./IfdAccordionItem";

const IfdAccordion = ({ exifData }: { exifData: ExifData }) => {
  return (
    <Accordion
      // Expand all nonempty IFDs
      defaultExpandedKeys={exifData.ifd.reduce((acc, ifd) => {
        if (ifd.ifd !== null && ifd.count !== 0) {
          acc.add(ifd.ifd);
        }
        return acc;
      }, new Set<Ifd>())}
      variant="enclosed"
      allowsMultipleExpanded
      className="shadow-sm"
    >
      {exifData.ifd.map((ifd) => (
        <IfdAccordionItem key={ifd.byteOffset} exifContent={ifd} />
      ))}
    </Accordion>
  );
};

export { IfdAccordion };
