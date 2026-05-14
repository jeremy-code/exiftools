import type { CellContext } from "@tanstack/react-table";
import { Pencil } from "lucide-react";
import { AccessibleIcon } from "radix-ui";

import { Button } from "@exifi/ui/components/Button";
import {
  Dialog,
  DialogTrigger,
  DialogTitle,
  DialogBody,
  DialogHeader,
  DialogDescription,
} from "@exifi/ui/components/Dialog";
import { Modal } from "@exifi/ui/components/Modal";

import { ExifEntryInspector } from "../entries/edit/ExifEntryInspector";
import type { ExifTableRow } from "../table/columns";

type EditEntryDialogProps = CellContext<ExifTableRow, unknown>;

const EditEntryDialog = ({ row }: EditEntryDialogProps) => {
  if ("entries" in row.original) {
    return null;
  }

  return (
    <DialogTrigger>
      <Button variant="outline" size="icon">
        <AccessibleIcon.Root label="Edit">
          <Pencil size="16" />
        </AccessibleIcon.Root>
      </Button>
      <Modal isDismissable>
        <Dialog aria-description="Edit Exif data dialog">
          <DialogHeader>
            <DialogTitle>Edit Exif data</DialogTitle>
            <DialogDescription>
              Make changes to the Exif entry here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <DialogBody>
            <ExifEntryInspector exifEntryObject={row.original} />
          </DialogBody>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
};

export { EditEntryDialog, type EditEntryDialogProps };
