"use client";

import type { ComponentPropsWithRef } from "react";

import { Switch as SwitchPrimitives } from "radix-ui";
import { cn, tv, type VariantProps } from "tailwind-variants";

const switchRootVariants = tv({
  base: [
    "group/switch",
    "relative inline-flex cursor-pointer justify-start gap-2 rounded-full ring-1 transition-[background-color,box-shadow,opacity] ring-inset",
    "shrink-0",
    "disabled:cursor-not-allowed disabled:opacity-50",
    "h-(--switch-height) w-(--switch-width)",
    "data-[state='unchecked']:bg-muted data-[state='unchecked']:ring-border hover:data-[state='unchecked']:ring-subtle-foreground/80",
    "data-[state='checked']:bg-solid data-[state='checked']:ring-solid",
  ],
  variants: {
    size: {
      xs: "[--switch-height:--spacing(3)] [--switch-width:--spacing(6)]",
      sm: "[--switch-height:--spacing(4)] [--switch-width:--spacing(8)]",
      md: "[--switch-height:--spacing(5)] [--switch-width:--spacing(10)]",
      lg: "[--switch-height:--spacing(7)] [--switch-width:--spacing(12)]",
    },
  },
  defaultVariants: { size: "md" },
});

type SwitchRootProps = ComponentPropsWithRef<typeof SwitchPrimitives.Root> &
  VariantProps<typeof switchRootVariants>;

const SwitchRoot = ({ className, size, ...props }: SwitchRootProps) => (
  <SwitchPrimitives.Root
    className={switchRootVariants({ className, size })}
    data-size={size}
    {...props}
  />
);

type SwitchThumbProps = ComponentPropsWithRef<typeof SwitchPrimitives.Thumb>;

const SwitchThumb = ({ className, ...props }: SwitchThumbProps) => (
  <SwitchPrimitives.Thumb
    className={cn(
      "flex items-center justify-center rounded-[inherit] bg-white text-gray-600 shadow-sm transition-[translate]",
      "shrink-0",
      "size-(--switch-height) scale-[0.8]",
      "data-[state='checked']:translate-x-[calc(var(--switch-width)-var(--switch-height))]",
      "group-data-[size='md']/switch:text-md group-data-[size='lg']/switch:text-lg group-data-[size='sm']/switch:text-sm group-data-[size='xs']/switch:text-xs",
      className,
    )}
    {...props}
  />
);

type SwitchProps = {
  thumbProps?: SwitchThumbProps;
} & ComponentPropsWithRef<typeof SwitchRoot>;

const Switch = ({ thumbProps, ...props }: SwitchProps) => (
  <SwitchRoot {...props}>
    <SwitchThumb {...thumbProps} />
  </SwitchRoot>
);

export {
  switchRootVariants,
  SwitchRoot,
  type SwitchRootProps,
  SwitchThumb,
  type SwitchThumbProps,
  Switch,
  type SwitchProps,
};
