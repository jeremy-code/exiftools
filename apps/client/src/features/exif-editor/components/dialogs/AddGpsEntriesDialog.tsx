import { MapPin } from "lucide-react";

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
import { Button } from "@exifi/ui/components/v2/Button";

import { ExifEntryAddGpsForm } from "../entries/add/ExifEntryAddGpsForm";

type AddGpsEntriesDialogProps = Omit<DialogTriggerProps, "children">;

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
            <ExifEntryAddGpsForm />
          </DialogBody>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
};

export { AddGpsEntriesDialog, type AddGpsEntriesDialogProps };
