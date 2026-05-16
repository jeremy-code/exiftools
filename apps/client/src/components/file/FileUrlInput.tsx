import type { ComponentPropsWithRef } from "react";

import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { z } from "zod";

import { useDropzoneStore } from "#hooks/useDropzoneStore";
import { formatList } from "#utils/formatList";
import { getFileFromResponse } from "#utils/getFileFromResponse";
import { Button, type ButtonProps } from "@exifi/ui/components/Button";
import { Spinner } from "@exifi/ui/components/Spinner";
import { TextField, type TextFieldProps } from "@exifi/ui/components/TextField";
import { toastQueue } from "@exifi/ui/components/Toast";
import { composeTailwindRenderProps } from "@exifi/ui/utils/composeTailwindRenderProps";

type FileUrlInputProps = {
  inputProps?: TextFieldProps;
  buttonProps?: ButtonProps;
  onSuccess?: (file: File) => void;
} & ComponentPropsWithRef<"form">;

const FileUrlInput = ({
  inputProps,
  buttonProps,
  onSuccess,
  ...props
}: FileUrlInputProps) => {
  const addAcceptedFiles = useDropzoneStore((state) => state.addAcceptedFiles);
  const mutation = useMutation({
    mutationFn: async (input: string) => {
      const response = await fetch(input);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return await getFileFromResponse(response);
    },
    mutationKey: ["FileUrlInput"],
    onSuccess: (data) => {
      addAcceptedFiles([data]);
      onSuccess?.(data);
    },
    onError: (error, variables) => {
      toastQueue.add({
        title: "Fetching from URL failed",
        description: `Fetching ${variables} failed with error ${error.message}.`,
        toastProps: {
          color: "destructive",
        },
      });
    },
  });
  const form = useForm({
    defaultValues: { fileUrl: "" },
    validators: {
      onChange: z.strictObject({
        fileUrl: z.httpUrl(),
      }),
    },
    // Using mutateAsync so form.isSubmitting is true while fetching
    onSubmit: ({ value }) => mutation.mutateAsync(value.fileUrl),
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
          children={(field) => (
            <TextField
              isRequired={true}
              type="url"
              inputProps={{ className: "rounded-r-none border-r-0" }}
              className="flex-1"
              {...inputProps}
              name={field.name}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={field.handleChange}
              aria-label={field.name}
              errorMessage={
                field.state.meta.isTouched && !field.state.meta.isValid ?
                  formatList(
                    (field.state.meta.errors as z.core.$ZodIssue[]).map(
                      (issue) => issue.message,
                    ),
                    undefined,
                    { style: "short", type: "conjunction" },
                  )
                : undefined
              }
            />
          )}
        />
        <form.Subscribe
          selector={(state) => state.isSubmitting}
          children={(isSubmitting) => (
            <Button
              type="submit"
              variant="surface"
              isDisabled={isSubmitting}
              {...buttonProps}
              className={composeTailwindRenderProps(
                buttonProps?.className,
                "rounded-l-none",
              )}
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
