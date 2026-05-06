import { MapPin } from "lucide-react";

import { Button } from "@exifi/ui/components2/Button";
import {
  Dialog,
  DialogTrigger,
  type DialogTriggerProps,
  DialogTitle,
  DialogBody,
  DialogHeader,
  DialogDescription,
} from "@exifi/ui/components2/Dialog";
import { Modal } from "@exifi/ui/components2/Modal";

import { ExifEntryAddGpsForm } from "../entries/add/ExifEntryAddGpsForm";

type AddGpsEntriesDialogProps = Omit<DialogTriggerProps, "children">;

const AddGpsEntriesDialog = (props: AddGpsEntriesDialogProps) => {
  return (
    <DialogTrigger {...props}>
      <Button variant="outline" size="icon" aria-label="Add GPS entries">
        <MapPin size="16" />
      </Button>
      <Modal isDismissable modalProps={{ isDismissable: true }}>
        <Dialog>
          <DialogHeader>
            <DialogTitle>Add GPS Exif entries</DialogTitle>
            <DialogDescription>
              Add GPS Exif entries here. Click save when you&apos;re done.
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
