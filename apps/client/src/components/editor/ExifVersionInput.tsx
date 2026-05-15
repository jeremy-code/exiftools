import { type ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

import type { ExifVersion } from "#features/exif-editor/editors/quick/types";
import {
  NumberField,
  type NumberFieldProps,
} from "@exifi/ui/components/NumberField";

type ExifVersionInputProps = {
  value?: ExifVersion;
  onValueChange?: (value: ExifVersion) => void;
  inputProps?: Omit<NumberFieldProps, "value" | "onChange">;
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
      <NumberField
        {...inputProps}
        aria-label={
          inputProps?.["aria-label"] !== undefined ?
            inputProps["aria-label"] + " Major"
          : "Major"
        }
        minValue={1}
        maxValue={2}
        value={value?.major}
        onChange={(target) => {
          if (value !== undefined) {
            onValueChange?.({
              major: target,
              minor: value.minor,
            });
          }
        }}
      />
      .
      <NumberField
        {...inputProps}
        aria-label={
          inputProps?.["aria-label"] !== undefined ?
            inputProps["aria-label"] + " Minor"
          : "Minor"
        }
        minValue={0}
        value={value?.minor}
        onChange={(target) => {
          if (value !== undefined) {
            onValueChange?.({
              major: value.major,
              minor: target,
            });
          }
        }}
      />
    </div>
  );
};

export { ExifVersionInput, type ExifVersionInputProps };
