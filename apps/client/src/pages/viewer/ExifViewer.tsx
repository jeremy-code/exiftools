import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";

import { FileInformation } from "#components/file/FileInformation";
import { useDropzoneState } from "#hooks/useDropzoneState";
import { useExifData } from "#hooks/useExifData";
import { mapExifData } from "#utils/mapExifData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@exiftools/ui/components/Accordion";
import { Button } from "@exiftools/ui/components/Button";
import { Skeleton } from "@exiftools/ui/components/Skeleton";

type ExifViewerProps = {
  file: File;
};

const ExifViewer = ({ file }: ExifViewerProps) => {
  const { isPending, data: arrayBuffer } = useQuery({
    queryKey: [file],
    queryFn: () => file.arrayBuffer(),
  });
  const exifData = useExifData(arrayBuffer);
  const removeAcceptedFileByIndex = useDropzoneState(
    (state) => state.removeAcceptedFileByIndex,
  );

  if (exifData === null) {
    if (isPending) {
      return <Skeleton className="h-50" />;
    } else {
      return (
        <>An error occurred while attempting to read the file's EXIF data.</>
      );
    }
  }

  const exifDataObject = mapExifData(exifData);

  return (
    <div className="flex flex-col gap-4">
      <div>
        <Button variant="ghost" onClick={() => removeAcceptedFileByIndex(0)}>
          <ArrowLeft className="size-[1em]" />
          Upload different image
        </Button>
      </div>
      <FileInformation file={file} />
      <Accordion
        // Expand all nonempty IFDs
        defaultValue={Object.entries(exifDataObject)
          .filter(([, value]) => value !== null)
          .map(([key]) => key)}
        variant="enclosed"
        type="multiple"
        className="max-w-xl"
      >
        {Object.entries(exifDataObject).map(([ifd, value]) => {
          const isEmpty = value === null;

          return (
            <AccordionItem value={ifd} key={ifd} disabled={isEmpty}>
              <AccordionTrigger>
                {ifd}
                {isEmpty ? " (empty)" : null}
              </AccordionTrigger>
              {value !== null ?
                <AccordionContent>
                  {/* TODO: Display data in something better than a table */}
                  <table className="w-full border-collapse text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="p-2 text-left font-medium">Tag</th>
                        <th className="p-2 text-left font-medium">Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Object.entries(value).map(([tag, val]) => (
                        <tr key={tag} className="border-b">
                          <td className="p-2">{val?.title ?? tag}</td>
                          <td className="p-2">{String(val?.value)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </AccordionContent>
              : null}
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};

export { ExifViewer, type ExifViewerProps };
