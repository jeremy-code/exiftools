import type { ComponentPropsWithRef } from "react";

import { useSortable } from "@dnd-kit/react/sortable";
import { X } from "lucide-react";
import { AccessibleIcon } from "radix-ui";
import { cn } from "tailwind-variants";

import { Button } from "@exiftools/ui/components/Button";
import { TabsTrigger } from "@exiftools/ui/components/Tabs";

type FileTabsTriggerProps = {
  removeFile: () => void;
  index: number;
  file: File | null;
} & Omit<ComponentPropsWithRef<typeof TabsTrigger>, "value">;

const FileTabsTrigger = ({
  className,
  index,
  file,
  removeFile,
  ...props
}: FileTabsTriggerProps) => {
  const { ref, isDragSource } = useSortable({
    id: String(index),
    index,
  });

  return (
    <TabsTrigger
      ref={ref}
      data-dragging={isDragSource}
      className={cn(
        "flex items-center pr-10! transition-colors data-[dragging=true]:opacity-50 data-[state=inactive]:hover:bg-subtle/80",
        className,
      )}
      value={String(index)}
      {...props}
    >
      <span className="line-clamp-1">
        {file !== null ?
          file.name !== "" ?
            file.name
          : "Unnamed File"
        : "New Tab"}
      </span>
      <Button
        className="absolute right-1 group-data-[state=inactive]/tabs-trigger:hover:bg-border"
        variant="ghost"
        size="icon-xs"
        onPointerDown={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
        onClick={() => removeFile()}
      >
        <AccessibleIcon.Root label="Close tab">
          <X size={16} />
        </AccessibleIcon.Root>
      </Button>
    </TabsTrigger>
  );
};

export { FileTabsTrigger, type FileTabsTriggerProps };
