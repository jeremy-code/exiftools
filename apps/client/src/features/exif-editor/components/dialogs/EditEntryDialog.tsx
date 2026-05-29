import { lazy, Suspense } from "react";

import type { CellContext } from "@tanstack/react-table";
import { Pencil } from "lucide-react";

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
import { Skeleton } from "@exifi/ui/components/Skeleton";

import type { ExifTableRow } from "../table/columns";

type EditEntryDialogProps = CellContext<ExifTableRow, unknown>;

const ExifEntryInspector = lazy(() =>
  import("../entries/edit/ExifEntryInspector").then((m) => ({
    default: m.ExifEntryInspector,
  })),
);

const EditEntryDialog = ({ row }: EditEntryDialogProps) => {
  if ("entries" in row.original) {
    return null;
  }

  return (
    <DialogTrigger>
      <Button variant="outline" size="icon" aria-label="Edit">
        <Pencil size="16" />
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
            <Suspense fallback={<Skeleton className="h-50 w-full" />}>
              <ExifEntryInspector exifEntryObject={row.original} />
            </Suspense>
          </DialogBody>
        </Dialog>
      </Modal>
    </DialogTrigger>
  );
};

export { EditEntryDialog, type EditEntryDialogProps };
