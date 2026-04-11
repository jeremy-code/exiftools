import type { ComponentPropsWithRef } from "react";

import { Check, Minus } from "lucide-react";
import { Checkbox as CheckboxPrimitive } from "radix-ui";
import { cn } from "tailwind-variants";

type CheckboxProps = Omit<
  ComponentPropsWithRef<typeof CheckboxPrimitive.Root>,
  "children"
>;

const Checkbox = ({ className, ...props }: CheckboxProps) => (
  <CheckboxPrimitive.Root
    checked
    className={cn(
      "bg-input flex size-4 appearance-none items-center justify-center rounded border border-muted transition",
      "hover:border-subtle-foreground",
      "data-[state=checked]:border-accent data-[state=checked]:bg-accent data-[state=checked]:text-white data-[state=checked]:hover:border-accent-hover data-[state=checked]:hover:bg-accent-hover",
      className,
    )}
    {...props}
  >
    <CheckboxPrimitive.Indicator className="group">
      <Minus className="size-3 stroke-3 not-group-data-[state=indeterminate]:hidden" />
      <Check className="size-3 stroke-3 not-group-data-[state=checked]:hidden" />
    </CheckboxPrimitive.Indicator>
  </CheckboxPrimitive.Root>
);

export { Checkbox };
