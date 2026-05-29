import { lazy, Suspense } from "react";

import { MapPin } from "lucide-react";

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

type AddGpsEntriesDialogProps = Omit<DialogTriggerProps, "children">;

const ExifEntryAddGpsForm = lazy(() =>
  import("../entries/add/ExifEntryAddGpsForm").then((m) => ({
    default: m.ExifEntryAddGpsForm,
  })),
);

const AddGpsEntriesDialog = (props: AddGpsEntriesDialogProps) => {
  return (
    <DialogTrigger {...props}>
      <Button variant="outline" size="icon" aria-label="Add GPS entries">
        <MapPin size="16" />
      </Button>
      <Modal isDismissable>
        <Dialog aria-description="Add GPS Exif entries dialog">
          <DialogHeader>
            <DialogTitle>Add GPS Exif entries</DialogTitle>
            <DialogDescription>
              Add GPS Exif entries here. Click submit when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <Suspense fallback={<Skeleton className="h-50 w-full" />}>
              <ExifEntryAddGpsForm />
            </Suspense>
          </DialogBody>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
};

export { AddGpsEntriesDialog, type AddGpsEntriesDialogProps };
