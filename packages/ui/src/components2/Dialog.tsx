import type { ComponentPropsWithRef } from "react";

import { X } from "lucide-react";
import {
  DialogTrigger,
  type DialogTriggerProps,
  type DialogProps,
  Dialog as AriaDialog,
  Heading,
  type HeadingProps as DialogTitleProps,
} from "react-aria-components/Dialog";
import { cn, tv } from "tailwind-variants";

import { Button, type ButtonProps as DialogCloseButtonProps } from "./Button";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";

const dialogVariants = tv({
  base: ["relative max-h-[inherit] overflow-auto p-6 outline-0"],
});

const Dialog = ({ className, ...props }: DialogProps) => {
  return <AriaDialog className={dialogVariants({ className })} {...props} />;
};

const DialogTitle = ({ className, ...props }: DialogTitleProps) => (
  <Heading
    slot="title"
    className={cn("text-xl font-medium", className)}
    {...props}
  />
);

const DialogCloseButton = ({ className, ...props }: DialogCloseButtonProps) => {
  return (
    <Button
      slot="close"
      size="icon-sm"
      variant="ghost"
      aria-label="Close"
      className={composeTailwindRenderProps(
        className,
        "absolute top-2 right-2",
      )}
      {...props}
    >
      <X className="size-4" />
    </Button>
  );
};

type DialogHeaderProps = ComponentPropsWithRef<"div">;

const DialogHeader = ({ className, ...props }: DialogHeaderProps) => {
  return (
    <div
      className={cn("flex flex-0 flex-col gap-2 px-6 pt-6 pb-4", className)}
      {...props}
    />
  );
};

type DialogBodyProps = ComponentPropsWithRef<"div">;

const DialogBody = ({ className, ...props }: DialogBodyProps) => {
  return <div className={cn("flex-1 px-6 pt-2 pb-6", className)} {...props} />;
};

type DialogFooterProps = {
  closeButton?: boolean;
} & ComponentPropsWithRef<"div">;

const DialogFooter = ({
  className,
  closeButton = false,
  children,
  ...props
}: DialogFooterProps) => {
  return (
    <div
      className={cn(
        "flex items-center justify-end gap-3 px-6 pt-2 pb-4",
        className,
      )}
      {...props}
    >
      {children}
      {closeButton && (
        <Button slot="close" variant="outline">
          Close
        </Button>
      )}
    </div>
  );
};

type DialogDescriptionProps = ComponentPropsWithRef<"div">;

const DialogDescription = ({ className, ...props }: DialogDescriptionProps) => {
  return <div className={cn("text-sm text-fg-muted", className)} {...props} />;
};

export {
  DialogTrigger,
  type DialogTriggerProps,
  Dialog,
  type DialogProps,
  dialogVariants,
  DialogTitle,
  type DialogTitleProps,
  DialogCloseButton,
  type DialogCloseButtonProps,
  DialogHeader,
  type DialogHeaderProps,
  DialogBody,
  type DialogBodyProps,
  DialogFooter,
  type DialogFooterProps,
  DialogDescription,
  type DialogDescriptionProps,
};
