import type { UserComment } from "#lib/exif/userComment/interfaces";
import { Textarea, type TextareaProps } from "@exifi/ui/components/Textarea";

type UserCommentTextareaProps = {
  value?: UserComment;
  onValueChange?: (value: UserComment) => void;
} & Omit<TextareaProps, "value" | "onChange">;

const UserCommentTextarea = ({
  value,
  onValueChange,
  ...props
}: UserCommentTextareaProps) => {
  return (
    <Textarea
      {...props}
      value={value?.value}
      onChange={(event) => {
        if (value !== undefined) {
          onValueChange?.({
            ...value,
            value: event.target.value,
          });
        }
      }}
    />
  );
};

export { UserCommentTextarea };
