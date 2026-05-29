import { lazy, Suspense } from "react";

import { useShallow } from "zustand/react/shallow";

import { useExifEditor } from "#features/exif-editor/contexts/ExifEditorContext";
import { Button } from "@exifi/ui/components/Button";
import {
  Dialog,
  DialogTrigger,
  type DialogTriggerProps,
  DialogTitle,
  DialogBody,
  DialogHeader,
  DialogDescription,
  DialogFooter,
} from "@exifi/ui/components/Dialog";
import { Modal } from "@exifi/ui/components/Modal";
import { Skeleton } from "@exifi/ui/components/Skeleton";

type DiffDialogProps = Omit<DialogTriggerProps, "children">;

const JsonDiffViewer = lazy(() =>
  import("#components/diff/JsonDiffViewer").then((m) => ({
    default: m.JsonDiffViewer,
  })),
);

const DiffDialog = (props: DiffDialogProps) => {
  const { isDirty, initialExifDataObject, exifDataObject } = useExifEditor(
    useShallow((state) => ({
      isDirty: state.isDirty,
      initialExifDataObject: state.initialExifDataObject,
      exifDataObject: state.exifDataObject,
    })),
  );

  return (
    <DialogTrigger {...props}>
      <Button variant="outline" aria-label="View diff" isDisabled={!isDirty}>
        Diff
      </Button>

      <Modal isDismissable>
        <Dialog aria-description="View Exif data diff">
          <DialogHeader>
            <DialogTitle>View Exif data diff</DialogTitle>
            <DialogDescription>View the Exif data diff here.</DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Suspense fallback={<Skeleton className="h-50 w-full" />}>
              <JsonDiffViewer
                oldValue={initialExifDataObject}
                newValue={exifDataObject}
              />
            </Suspense>
          </DialogBody>
          <DialogFooter closeButton></DialogFooter>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
};

export { DiffDialog, type DiffDialogProps };
