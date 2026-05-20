import { useState, type ComponentPropsWithRef } from "react";

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
  const [exifVersion, setExifVersion] = useState<{
    major: number | undefined;
    minor: number | undefined;
  }>(value ?? { major: undefined, minor: undefined });

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
        value={exifVersion.major}
        onChange={(target) => {
          setExifVersion((prev) => {
            const nextExifVersion = {
              ...prev,
              major: target,
            };

            if (
              nextExifVersion.major !== undefined &&
              nextExifVersion.minor !== undefined
            ) {
              onValueChange?.({
                major: nextExifVersion.major,
                minor: nextExifVersion.minor,
              });
            }

            return nextExifVersion;
          });
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
        value={exifVersion.minor}
        onChange={(target) => {
          setExifVersion((prev) => {
            const nextExifVersion = {
              ...prev,
              minor: target,
            };

            if (
              nextExifVersion.major !== undefined &&
              nextExifVersion.minor !== undefined
            ) {
              onValueChange?.({
                major: nextExifVersion.major,
                minor: nextExifVersion.minor,
              });
            }

            return nextExifVersion;
          });
        }}
      />
    </div>
  );
};

export { ExifVersionInput, type ExifVersionInputProps };
