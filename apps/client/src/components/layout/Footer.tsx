import type { ComponentPropsWithRef } from "react";

import { cn } from "tailwind-variants";

import { Button } from "@exifi/ui/components/Button";
import { Link } from "@exifi/ui/components/Link";
import { Github } from "@exifi/ui/components/icons/Github";

const Footer = ({ className, ...props }: ComponentPropsWithRef<"footer">) => {
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
        <Button asChild>
          <Link href="https://github.com/jeremy-code/exifi">
            <Github aria-hidden className="size-4" />
            GitHub
          </Link>
        </Button>
      </div>
    </footer>
  );
};

export { Footer };
