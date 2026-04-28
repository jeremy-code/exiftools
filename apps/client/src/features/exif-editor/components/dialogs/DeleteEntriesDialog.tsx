import { Trash2 } from "lucide-react";

import { formatPlural } from "#utils/formatPlural";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogBody,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@exifi/ui/components/AlertDialog";
import { Button } from "@exifi/ui/components/Button";

type DeleteEntriesDialogProps = {
  rows: string[];
  deleteRows: () => void;
};

const DeleteEntriesDialog = ({
  rows,
  deleteRows,
}: DeleteEntriesDialogProps) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button>
          <Trash2 size={16} />
          Delete
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent
        aria-description="Delete Exif entries alert dialog"
        className="max-w-[min(calc(100%-2rem),--spacing(140))]"
      >
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogBody>
          {`This action will delete ${formatPlural(rows.length, {
            one: " Exif entry",
            other: " Exif entries",
          })}`}
        </AlertDialogBody>
        <AlertDialogFooter>
          <AlertDialogCancel asChild>
            <Button>Cancel</Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={() => deleteRows()} className="ml-3">
              Delete
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export { DeleteEntriesDialog, type DeleteEntriesDialogProps };
