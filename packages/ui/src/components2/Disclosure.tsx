import { use } from "react";

import { ChevronRight } from "lucide-react";
import {
  Disclosure as AriaDisclosure,
  DisclosurePanel as AriaDisclosurePanel,
  DisclosureStateContext,
  Heading,
  type DisclosurePanelProps,
  type DisclosureProps,
} from "react-aria-components/Disclosure";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { cn, tv } from "tailwind-variants";

import { Button, type ButtonProps } from "./Button";
import type { HeadingProps } from "./Heading";
import { composeTailwindRenderProps } from "../utils/composeTailwindRenderProps";

const disclosureVariants = tv({
  base: "min-w-50 rounded-lg text-gray-900 dark:text-gray-200",
});

const Disclosure = ({ children, ...props }: DisclosureProps) => {
  return (
    <AriaDisclosure
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        disclosureVariants({ ...renderProps, className }),
      )}
    >
      {children}
    </AriaDisclosure>
  );
};

const chevronVariants = tv({
  base: "size-4 text-gray-500 transition-transform duration-200 ease-in-out dark:text-gray-400",
  variants: {
    isExpanded: {
      true: "rotate-90 transform",
    },
    isDisabled: {
      true: "text-gray-300 dark:text-gray-600 forced-colors:text-[GrayText]",
    },
  },
});

type DisclosureHeaderProps = Omit<HeadingProps, "children"> & {
  children: ButtonProps["children"];
};

const DisclosureHeader = ({
  children,
  className,
  ...props
}: DisclosureHeaderProps) => {
  const disclosureStateContext = use(DisclosureStateContext);

  if (disclosureStateContext === null) {
    throw new Error("DisclosureHeader must be used within a Disclosure");
  }

  const { isExpanded } = disclosureStateContext;
  return (
    <Heading className={cn("text-lg font-semibold", className)} {...props}>
      <Button slot="trigger" variant="ghost" className="w-full justify-start">
        {composeRenderProps(children, (children, renderProps) => (
          <>
            <ChevronRight
              aria-hidden
              className={chevronVariants({ isExpanded, ...renderProps })}
            />
            <span>{children}</span>
          </>
        ))}
      </Button>
    </Heading>
  );
};

const DisclosurePanel = ({ children, ...props }: DisclosurePanelProps) => {
  return (
    <AriaDisclosurePanel
      {...props}
      className={composeTailwindRenderProps(
        props.className,
        "h-(--disclosure-panel-height) overflow-clip motion-safe:transition-[height]",
      )}
    >
      <div className="px-4 py-2">{children}</div>
    </AriaDisclosurePanel>
  );
};

export {
  disclosureVariants,
  Disclosure,
  type DisclosureProps,
  chevronVariants,
  DisclosureHeader,
  type DisclosureHeaderProps,
  DisclosurePanel,
  type DisclosurePanelProps,
};
