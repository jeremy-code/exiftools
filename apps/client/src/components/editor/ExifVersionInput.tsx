import { useMemo, type ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

import { decodeStringFromUtf8 } from "#utils/decodeStringFromUtf8";
import {
  NumberField,
  type NumberFieldProps,
} from "@exifi/ui/components2/NumberField";

const textEncoder = new TextEncoder();

type ExifVersionInputProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
  inputProps?: Omit<NumberFieldProps, "value">;
} & ComponentPropsWithRef<"div">;

const ExifVersionInput = ({
  className,
  value,
  onValueChange,
  inputProps,
  ...props
}: ExifVersionInputProps) => {
  const exifVersion = useMemo(
    () => decodeStringFromUtf8(new Uint8Array(value)),
    [value],
  );

  // Everything seems to make sense except 0230 === 2.3?
  const major = parseInt(exifVersion.slice(0, 2));
  const minor = parseInt(exifVersion.slice(2));

  return (
    <div className={cn("flex items-baseline gap-2", className)} {...props}>
      <NumberField
        {...inputProps}
        minValue={1}
        maxValue={2}
        value={major}
        aria-label="Exif Version (major)"
        onChange={(event) => {
          onValueChange(
            Array.from(
              textEncoder.encode(
                event.toString().padStart(2, "0") +
                  minor.toString().padStart(2, "0"),
              ),
            ),
          );
        }}
      />
      .
      <NumberField
        {...inputProps}
        minValue={0}
        value={minor}
        aria-label="Exif Version (minor)"
        onChange={(event) => {
          onValueChange(
            Array.from(
              textEncoder.encode(
                major.toString().padStart(2, "0") +
                  event.toString().padStart(2, "0"),
              ),
            ),
          );
        }}
      />
    </div>
  );
};

export { ExifVersionInput, type ExifVersionInputProps };
