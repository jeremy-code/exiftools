import type { ComponentPropsWithRef } from "react";

import { useForm } from "@tanstack/react-form";

import { useDropzoneStore } from "#hooks/useDropzoneStore";
import { getFileFromResponse } from "#utils/getFileFromResponse";
import { Button, type ButtonProps } from "@exiftools/ui/components/Button";
import { Input, type InputProps } from "@exiftools/ui/components/Input";
import { Spinner } from "@exiftools/ui/components/Spinner";
import { toast } from "@exiftools/ui/hooks/useToast";

type FileUrlInputProps = {
  inputProps?: InputProps;
  buttonProps?: ButtonProps;
} & ComponentPropsWithRef<"form">;

const FileUrlInput = ({
  inputProps,
  buttonProps,
  ...props
}: FileUrlInputProps) => {
  const addAcceptedFiles = useDropzoneStore((state) => state.addAcceptedFiles);
  const form = useForm({
    defaultValues: {
      fileUrl: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const response = await fetch(value.fileUrl);

        if (!response.ok) {
          toast({
            title: "Fetching from URL failed",
            description: `Fetching ${value.fileUrl} failed with error code ${response.status}.`,
            variant: "destructive",
          });
          return;
        }

        const file = await getFileFromResponse(response);
        addAcceptedFiles([file]);
      } catch (e) {
        toast({
          title: "Fetching from URL failed",
          description: `An error occurred while attempting to fetch ${value.fileUrl}: ${
            e instanceof Error ? e.message : "unknown error"
          }.`,
          variant: "destructive",
        });
      }
    },
  });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        void form.handleSubmit();
      }}
      {...props}
    >
      <div className="flex">
        <form.Field
          name="fileUrl"
          validators={{
            onChange: ({ value }) =>
              !URL.canParse(value) ? "Please enter a URL." : undefined,
          }}
          children={(field) => (
            <Input
              required
              type="url"
              className="rounded-r-none border-r-0"
              {...inputProps}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(e) => field.handleChange(e.target.value)}
            />
          )}
        />
        <form.Subscribe
          selector={(state) => state.isSubmitting}
          children={(isSubmitting) => (
            <Button
              type="submit"
              variant="surface"
              className="rounded-l-none"
              disabled={isSubmitting}
              {...buttonProps}
            >
              {isSubmitting && <Spinner className="absolute" />}
              <span
                className="data-[pending=true]:invisible"
                data-pending={isSubmitting}
              >
                Upload
              </span>
            </Button>
          )}
        />
      </div>
    </form>
  );
};

export { FileUrlInput, type FileUrlInputProps };
