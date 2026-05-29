import { lazy, Suspense } from "react";

import { Plus } from "lucide-react";

import { Button } from "@exifi/ui/components/Button";
import {
  Dialog,
  DialogTrigger,
  type DialogTriggerProps,
  DialogTitle,
  DialogBody,
  DialogHeader,
  DialogDescription,
} from "@exifi/ui/components/Dialog";
import { Modal } from "@exifi/ui/components/Modal";
import { Skeleton } from "@exifi/ui/components/Skeleton";

type AddEntryDialogProps = Omit<DialogTriggerProps, "children">;

const ExifEntryAddForm = lazy(() =>
  import("../entries/add/ExifEntryAddForm").then((m) => ({
    default: m.ExifEntryAddForm,
  })),
);

const AddEntryDialog = (props: AddEntryDialogProps) => {
  return (
    <DialogTrigger {...props}>
      <Button variant="outline" size="icon" aria-label="Add entry">
        <Plus size="16" />
      </Button>

      <Modal>
        <Dialog aria-description="Add Exif entry dialog">
          <DialogHeader>
            <DialogTitle>Add Exif entry</DialogTitle>
            <DialogDescription>
              Add an Exif entry here. Click submit when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Suspense fallback={<Skeleton className="h-50 w-full" />}>
              <ExifEntryAddForm />
            </Suspense>
          </DialogBody>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
};

export { AddEntryDialog, type AddEntryDialogProps };
