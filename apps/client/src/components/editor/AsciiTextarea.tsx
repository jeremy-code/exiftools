import { useMemo } from "react";

import { decodeStringFromUtf8 } from "#utils/decodeStringFromUtf8";
import { encodeStringToUtf8 } from "#utils/encodeStringToUtf8";
import {
  TextArea,
  type TextAreaProps,
} from "@exifi/ui/components2/form/TextArea";

type AsciiTextareaProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
} & Omit<TextAreaProps, "value">;

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
    <TextArea
      {...props}
      value={asciiValue}
      onChange={(event) => {
        onValueChange(Array.from(encodeStringToUtf8(event.target.value)));
      }}
    />
  );
};

export { AsciiTextarea, type AsciiTextareaProps };
