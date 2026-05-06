import { Plus } from "lucide-react";

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

import { ExifEntryAddForm } from "../entries/add/ExifEntryAddForm";

type AddEntryDialogProps = Omit<DialogTriggerProps, "children">;

const AddEntryDialog = (props: AddEntryDialogProps) => {
  return (
    <DialogTrigger {...props}>
      <Button variant="outline" size="icon" aria-label="Add entry">
        <Plus size="16" />
      </Button>

      <Modal>
        <Dialog>
          <DialogHeader>
            <DialogTitle>Add Exif entry</DialogTitle>
            <DialogDescription>
              Add an Exif entry here. Click save when you&apos;re done.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <ExifEntryAddForm />
          </DialogBody>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
};

export { AddEntryDialog, type AddEntryDialogProps };
