import type { ComponentPropsWithRef } from "react";

import { Code } from "lucide-react";
import { cn } from "tailwind-variants";

import { buttonVariants } from "@exifi/ui/components2/Button";
import { Link } from "@exifi/ui/components2/Link";

export const Footer = ({
  className,
  ...props
}: ComponentPropsWithRef<"footer">) => {
  return (
    <footer className={cn("shrink border-t", className)} {...props}>
      <div className="container flex items-center justify-between py-4">
        <span>
          {"Made by "}
          <Link
            color="blue"
            href="https://jeremy.ng"
            underline="hover"
            isExternal
          >
            Jeremy Nguyen
          </Link>
        </span>
        <Link
          className={buttonVariants()}
          href="https://github.com/jeremy-code/exifi"
        >
          <Code />
          Source code
        </Link>
      </div>
    </footer>
  );
};
