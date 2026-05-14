import { Plus } from "lucide-react";

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

import { ExifEntryAddForm } from "../entries/add/ExifEntryAddForm";

type AddEntryDialogProps = Omit<DialogTriggerProps, "children">;

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
            <ExifEntryAddForm />
          </DialogBody>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
};

export { AddEntryDialog, type AddEntryDialogProps };
