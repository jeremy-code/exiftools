import type { ComponentPropsWithRef } from "react";

import { Check } from "lucide-react";
import {
  Collection as ListBoxCollection,
  type CollectionProps as ListBoxCollectionProps,
  Header as AriaHeader,
  type HeaderProps as ListboxHeaderProps,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  type ListBoxItemProps,
  type ListBoxProps,
  ListBoxSection,
  type ListBoxSectionProps,
} from "react-aria-components/ListBox";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { cn, tv } from "tailwind-variants";

import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";
import { focusRing } from "../utils/focusRing";

const ListBox = <T extends object>({
  className,
  ...props
}: ListBoxProps<T>) => {
  return (
    <AriaListBox
      {...props}
      className={composeTailwindRenderProps(
        className,
        "w-50 rounded-lg border border-border bg-surface p-1 font-sans outline-0",
      )}
    />
  );
};

const listBoxItemVariants = tv({
  extend: focusRing,
  base: "group/list-box-item relative flex items-center gap-2 rounded-sm px-2.5 py-1.5 text-sm transition-[background-color,border-radius,opacity,color] forced-color-adjust-none select-none",
  variants: {
    isSelected: {
      false:
        "text-fg-bold -outline-offset-2 hover:bg-bg-muted pressed:bg-border",
      true: [
        // Outline-white! to override focusRing style
        "bg-accent text-white -outline-offset-4 outline-white! forced-colors:bg-[Highlight] forced-colors:text-[HighlightText] forced-colors:outline-[HighlightText]",
        // selectionMode="multiple
        "[&+[data-selected]]:rounded-t-none [&:has(+[data-selected])]:rounded-b-none",
      ],
    },
    isDisabled: {
      true: "cursor-not-allowed text-fg-subtle forced-colors:text-[GrayText]",
    },
  },
});

const ListBoxItem = (props: ListBoxItemProps) => {
  const textValue =
    props.textValue ||
    (typeof props.children === "string" ? props.children : undefined);

  return (
    <AriaListBoxItem
      {...props}
      textValue={textValue}
      className={listBoxItemVariants}
    >
      {composeRenderProps(props.children, (children) => (
        <>
          <Check className="invisible size-4 opacity-0 group-selected/list-box-item:visible group-selected/list-box-item:opacity-100" />
          {children}
        </>
      ))}
    </AriaListBoxItem>
  );
};

const ListBoxHeader = ({
  className,
  ...props
}: ComponentPropsWithRef<typeof AriaHeader>) => {
  return (
    <AriaHeader
      className={cn("py-1.5 pr-2 pl-8 text-sm font-semibold", className)}
      {...props}
    />
  );
};

export {
  ListBox,
  type ListBoxProps,
  ListBoxItem,
  type ListBoxItemProps,
  listBoxItemVariants,
  ListBoxHeader,
  type ListboxHeaderProps,
  ListBoxSection,
  type ListBoxSectionProps,
  ListBoxCollection,
  type ListBoxCollectionProps,
};
