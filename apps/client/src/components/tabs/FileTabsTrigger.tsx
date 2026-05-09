import { useSortable } from "@dnd-kit/react/sortable";
import { X } from "lucide-react";
import { cn } from "tailwind-variants";

import { Button } from "@exifi/ui/components2/Button";
import { Tab, type TabProps } from "@exifi/ui/components2/Tabs";

type FileTabsTriggerProps = {
  id: string;
  index: number;
  file: File | null;
  removeTab: () => void;
} & TabProps;

const FileTabsTrigger = ({
  className,
  id,
  index,
  file,
  removeTab,
  ...props
}: FileTabsTriggerProps) => {
  const { ref, isDragSource } = useSortable({ id, index });

  return (
    <Tab
      ref={ref}
      id={id}
      data-dragging={isDragSource}
      className={cn(
        "flex min-w-50 items-center pr-10! transition-colors data-[dragging=true]:opacity-50",
        "data-[state=inactive]:hover:bg-gray-100",
        "dark:data-[state=inactive]:hover:bg-gray-700/50",
        className,
      )}
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
        onPress={() => removeTab()}
        aria-label="Close tab"
      >
        <X size={16} />
      </Button>
    </Tab>
  );
};

export { FileTabsTrigger, type FileTabsTriggerProps };
