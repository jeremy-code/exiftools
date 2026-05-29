import type { ComponentPropsWithRef } from "react";

import { TriangleAlert } from "lucide-react";
import { Text, type TextProps } from "react-aria-components/Text";
import { twMerge } from "tailwind-merge";
import { tv, type VariantProps } from "tailwind-variants";

const calloutVariants = tv({
  base: "mx-auto flex items-center gap-4 rounded border p-4",
  variants: {
    variant: {
      destructive: "bg-red-100 text-red-400 dark:bg-red-950 dark:text-red-300",
      warning:
        "border-yellow-300 bg-yellow-100 text-yellow-600 dark:border-yellow-800 dark:bg-yellow-950 dark:text-yellow-200",
    },
  },
});

type CalloutProps = ComponentPropsWithRef<"div"> &
  VariantProps<typeof calloutVariants>;

const Callout = ({ children, className, variant, ...props }: CalloutProps) => {
  return (
    <div className={calloutVariants({ className, variant })} {...props}>
      <div className="w-8">
        <TriangleAlert aria-label="Alert" />
      </div>
      {children}
    </div>
  );
};

const CalloutText = ({ className, ...props }: TextProps) => {
  return (
    <Text
      className={twMerge("m-0 text-sm/6 font-normal", className)}
      {...props}
    />
  );
};

export { Callout, type CalloutProps, CalloutText };
