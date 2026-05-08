import { useMemo } from "react";

import { decodeStringFromUtf8 } from "#utils/decodeStringFromUtf8";
import { encodeStringToUtf8 } from "#utils/encodeStringToUtf8";
import {
  TextAreaField,
  type TextAreaFieldProps,
} from "@exifi/ui/components2/TextAreaField";

type AsciiTextareaProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
} & Omit<TextAreaFieldProps, "value">;

const AsciiTextarea = ({
  value,
  onValueChange,
  ...props
}: AsciiTextareaProps) => {
  const asciiValue = useMemo(
    () => decodeStringFromUtf8(new Uint8Array(value)),
    [value],
  );

  return (
    <TextAreaField
      {...props}
      value={asciiValue}
      onChange={(value) => {
        onValueChange(Array.from(encodeStringToUtf8(value)));
      }}
    />
  );
};

export { AsciiTextarea, type AsciiTextareaProps };
