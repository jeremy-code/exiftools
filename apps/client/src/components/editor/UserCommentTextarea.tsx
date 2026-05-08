import { useMemo } from "react";

import { parseUserComment } from "#lib/exif/parseUserComment";
import {
  TextAreaField,
  type TextAreaFieldProps,
} from "@exifi/ui/components2/TextAreaField";

type UserCommentTextareaProps = {
  value: number[];
  onValueChange: (value: number[]) => void;
} & Omit<TextAreaFieldProps, "value" | "onChange">;

const textEncoder = new TextEncoder();

const UserCommentTextarea = ({
  value,
  onValueChange,
  ...props
}: UserCommentTextareaProps) => {
  const textareaValue = useMemo(() => parseUserComment(value), [value]);

  return (
    <TextAreaField
      {...props}
      value={textareaValue}
      onChange={(target) => {
        onValueChange([
          ...value.slice(0, 8),
          ...Array.from(textEncoder.encode(target)),
        ]);
      }}
    />
  );
};

export { UserCommentTextarea, type UserCommentTextareaProps };
