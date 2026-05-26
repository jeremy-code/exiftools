import { Ellipsis } from "lucide-react";
import type { MenuTriggerProps } from "react-aria-components";
import { useShallow } from "zustand/react/shallow";

import { useExifEditorStore } from "#features/exif-editor/hooks/useExifEditor";
import { useFileStore } from "#hooks/useFileStore";
import { getCurrentPosition } from "#utils/getCurrentPosition";
import { Button } from "@exifi/ui/components/Button";
import { Menu, MenuItem, MenuTrigger } from "@exifi/ui/components/Menu";

type ExifMenuProps = Omit<MenuTriggerProps, "children">;

const ExifMenu = (props: ExifMenuProps) => {
  const { file } = useFileStore();
  const [
    fix,
    updatePixelDimensions,
    updateGeolocationPosition,
    updateDateAndTimeDigitized,
    addImageUniqueId,
  ] = useExifEditorStore(
    useShallow((state) => [
      state.fix,
      state.updatePixelDimensions,
      state.updateGeolocationPosition,
      state.updateDateAndTimeDigitized,
      state.addImageUniqueId,
    ]),
  );

  return (
    <MenuTrigger {...props}>
      <Button aria-label="Actions" size="icon" variant="outline">
        <Ellipsis className="size-4" />
      </Button>
      <Menu>
        <MenuItem onAction={() => fix()}>Fix</MenuItem>
        <MenuItem onAction={() => updatePixelDimensions(file)}>
          Add image dimensions
        </MenuItem>
        <MenuItem
          onAction={() => getCurrentPosition().then(updateGeolocationPosition)}
        >
          Set Exif to current GPS position
        </MenuItem>
        <MenuItem onAction={() => updateDateAndTimeDigitized()}>
          Set Date and Time Digitized to current time
        </MenuItem>
        <MenuItem onAction={() => addImageUniqueId()}>
          Add Image Unique ID
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
};

export { ExifMenu };
