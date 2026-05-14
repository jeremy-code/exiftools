import type { ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

type HorizontalListProps = ComponentPropsWithRef<"ul">;

const HorizontalList = ({ className, ...props }: HorizontalListProps) => {
  return <ul className={cn("inline-block list-none", className)} {...props} />;
};

type HorizontalListItemProps = ComponentPropsWithRef<"li">;

const HorizontalListItem = ({
  className,
  ...props
}: HorizontalListItemProps) => {
  return (
    <li
      /**
       * Since JSX strips backslashes in HTML, `String.raw` is necessary for
       * correct CSS output
       *
       * @see {@link https://tailwindcss.com/docs/adding-custom-styles#handling-whitespace}
       */
      className={cn(
        String.raw`inline not-last:after:font-black not-last:after:content-['\a0_·_']`,
        className,
      )}
      {...props}
    />
  );
};

export {
  HorizontalList,
  type HorizontalListProps,
  HorizontalListItem,
  type HorizontalListItemProps,
};
