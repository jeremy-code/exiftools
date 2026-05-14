import { Trash2 } from "lucide-react";

import { formatPlural } from "#utils/formatPlural";
import {
  Dialog,
  DialogTrigger,
  type DialogTriggerProps,
  DialogTitle,
  DialogBody,
  DialogHeader,
  DialogFooter,
} from "@exifi/ui/components/Dialog";
import { Modal } from "@exifi/ui/components/Modal";
import { Button } from "@exifi/ui/components/v2/Button";

type DeleteEntriesDialogProps = {
  rows: string[];
  deleteRows: () => void;
} & Omit<DialogTriggerProps, "children">;

const DeleteEntriesDialog = ({
  rows,
  deleteRows,
  ...props
}: DeleteEntriesDialogProps) => {
  return (
    <DialogTrigger {...props}>
      <Button aria-label="Delete entries">
        <Trash2 size={16} />
        Delete
      </Button>
      <Modal
        aria-description="Delete Exif entries alert dialog"
        modalProps={{
          className: "max-w-[min(calc(100%-2rem),--spacing(140))]",
        }}
      >
        <Dialog role="alertdialog">
          <DialogHeader>
            <DialogTitle>Are you sure?</DialogTitle>
          </DialogHeader>
          <DialogBody>
            {`This action will delete ${formatPlural(rows.length, {
              one: " Exif entry",
              other: " Exif entries",
            })}`}
          </DialogBody>
          <DialogFooter closeButton>
            <Button onClick={() => deleteRows()} className="ml-3">
              Delete
            </Button>
          </DialogFooter>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
};

export { DeleteEntriesDialog, type DeleteEntriesDialogProps };
