import type { ComponentPropsWithRef } from "react";

import { useQuery } from "@tanstack/react-query";
import { ArrowLeft } from "lucide-react";
import { cn } from "tailwind-variants";

import { FileInformation } from "#components/file/FileInformation";
import { useDropzoneState } from "#hooks/useDropzoneState";
import { useExifData } from "#hooks/useExifData";
import { formatPlural } from "#utils/formatPlural";
import { mapExifData } from "#utils/mapExifData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@exiftools/ui/components/Accordion";
import { Badge } from "@exiftools/ui/components/Badge";
import { Button } from "@exiftools/ui/components/Button";
import { Skeleton } from "@exiftools/ui/components/Skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@exiftools/ui/components/Table";

type ExifViewerProps = {
  file: File;
} & ComponentPropsWithRef<"div">;

const ExifViewer = ({ file, className, ...props }: ExifViewerProps) => {
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
    <div className={cn("flex flex-col gap-4", className)} {...props}>
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
        size="lg"
      >
        {Object.entries(exifDataObject).map(([ifd, value]) => {
          const isEmpty = value === null;
          const entries = !isEmpty ? Object.entries(value) : [];

          return (
            <AccordionItem key={ifd} value={ifd} disabled={isEmpty}>
              <AccordionTrigger>
                <div className="flex gap-2">
                  {ifd}
                  <Badge>
                    {formatPlural(entries.length, {
                      one: " tag",
                      other: " tags",
                    })}
                  </Badge>
                </div>
              </AccordionTrigger>
              {!isEmpty ?
                <AccordionContent>
                  {/* TODO: Display data in something better than a table */}
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeader>Tag</TableHeader>
                        <TableHeader>Value</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {entries.map(([tag, val]) => (
                        <TableRow key={tag}>
                          <TableCell>{val?.title ?? tag}</TableCell>
                          <TableCell>{String(val?.value)}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
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
