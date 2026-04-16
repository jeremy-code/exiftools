import { Suspense, type ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

import { FileInformation } from "#components/file/FileInformation";
import { Skeleton } from "@exiftools/ui/components/Skeleton";

import { ExifViewerData } from "./-ExifViewerData";

type ExifViewerProps = {
  file: File;
} & ComponentPropsWithRef<"div">;

const ExifViewer = ({ file, className, ...props }: ExifViewerProps) => {
  return (
    <div>
      <div className={cn("flex flex-col gap-4", className)} {...props}>
        <FileInformation file={file} />
        <Suspense fallback={<Skeleton className="h-50 w-full" />}>
          <ExifViewerData file={file} />
        </Suspense>
      </div>
    </div>
  );
};

export { ExifViewer, type ExifViewerProps };
