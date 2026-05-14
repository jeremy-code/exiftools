import { type ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

import type { ExifVersion } from "#features/exif-editor/editors/quick/types";
import { Input, type InputProps } from "@exifi/ui/components/Input";

type ExifVersionInputProps = {
  value?: ExifVersion;
  onValueChange?: (value: ExifVersion) => void;
  inputProps?: Omit<InputProps, "value" | "onChange">;
} & ComponentPropsWithRef<"div">;

const ExifVersionInput = ({
  className,
  value,
  onValueChange,
  inputProps,
  ...props
}: ExifVersionInputProps) => {
  return (
    <div className={cn("flex items-baseline gap-2", className)} {...props}>
      <Input
        {...inputProps}
        type="number"
        min={1}
        max={2}
        value={value?.major}
        onChange={(event) => {
          if (
            value !== undefined &&
            !Number.isNaN(event.target.valueAsNumber)
          ) {
            onValueChange?.({
              major: event.target.valueAsNumber,
              minor: value.minor,
            });
          }
        }}
      />
      .
      <Input
        {...inputProps}
        type="number"
        min={0}
        value={value?.minor}
        onChange={(event) => {
          if (
            value !== undefined &&
            !Number.isNaN(event.target.valueAsNumber)
          ) {
            onValueChange?.({
              major: value.major,
              minor: event.target.valueAsNumber,
            });
          }
        }}
      />
    </div>
  );
};

export { ExifVersionInput, type ExifVersionInputProps };
