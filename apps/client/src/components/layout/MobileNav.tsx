import { useRef, useState } from "react";

import { Link as RouterLink } from "@tanstack/react-router";
import { cn } from "tailwind-variants";

import { useBreakpoint } from "#hooks/useBreakpoint";
import { navigationMenuTriggerVariants } from "@exifi/ui/components/NavigationMenu";
import { Button, type ButtonProps } from "@exifi/ui/components2/Button";
import {
  Popover,
  PopoverTrigger,
  type PopoverTriggerProps,
} from "@exifi/ui/components2/Popover";

import { NAVIGATION_ITEMS } from "./constants";

const MobileNavButton = ({ className, ...props }: ButtonProps) => {
  return (
    <Button
      className={cn("group/navbar", className)}
      variant="ghost"
      size="icon"
      {...props}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        strokeLinecap="round"
        className="size-4 stroke-foreground stroke-2"
      >
        {/**
         * The following paths are lines of width 18px and height 2px
         * in the 24x24 viewBox. The center of top path and bottom
         * path is (12,18) and (12,6), respectively. Hence, after a
         * rotation, to center them they are translated by 6px in the
         * y-direction.
         */}
        <path
          className="origin-center transition-transform transform-stroke group-data-[state=open]/navbar:translate-y-1.5 group-data-[state=open]/navbar:rotate-45"
          d="M4 6H20"
        />
        <path
          /**
           * Transition between the default state (line centered at y=12
           * with width 18px) to a point located at the SVG's center
           * (12,12) when open. Since `d` CSS property is not supported in
           * Safari, use opacity to fade in/out.
           *
           * @see {@link https://caniuse.com/mdn-css_properties_d}
           */
          className="transition-[d,opacity] group-data-[state=open]/navbar:opacity-0 group-data-[state=open]/navbar:[d:path('M12_12H12')]"
          d="M4 12H20"
        />
        <path
          className="origin-center transition-transform transform-stroke group-data-[state=open]/navbar:-translate-y-1.5 group-data-[state=open]/navbar:-rotate-45"
          d="M4 18H20"
        />
      </svg>
    </Button>
  );
};

type MobileNavProps = PopoverTriggerProps;

/**
 * While <Popover> is not the ideal component for a mobile navigation menu,
 * using the <NavigationMenu> component would require significant changes (e.g.
 * the default behavior is opening the menu on hover, close on `mouseleave`,
 * etc.). In regards to accessibility, <Popover> does initially trap focus
 * inside <PopoverContent>.
 */
const MobileNav = (props: Omit<MobileNavProps, "children">) => {
  const popoverAnchorRef = useRef<HTMLDivElement>(null);
  const breakpoint = useBreakpoint("sm");
  const [isOpen, setIsOpen] = useState(false);

  if (breakpoint) {
    return null;
  }

  return (
    <nav>
      <PopoverTrigger {...props}>
        <MobileNavButton
          onPress={() => setIsOpen((prev) => !prev)}
          data-state={isOpen ? "open" : "closed"}
          aria-label={isOpen ? "Close menu" : "Open menu"}
        />

        {/* Anchor is set to element that is size of <Navbar /> */}
        <div
          aria-hidden="true"
          ref={popoverAnchorRef}
          className="pointer-events-none absolute inset-0"
        />
        <Popover
          isOpen={isOpen}
          onOpenChange={setIsOpen}
          showArrow={false}
          triggerRef={popoverAnchorRef}
          isNonModal={true}
          offset={0}
          containerPadding={0}
          className="left-0! w-full rounded-t-none bg-background p-2.5 shadow-none ring-0 ring-border"
        >
          <ul className="space-y-0.5">
            {NAVIGATION_ITEMS.map((item) => (
              <li key={item.href}>
                <RouterLink
                  to={item.href}
                  // Using <NavigationMenuLink> would error due to not being in
                  // a <NavigationMenu>
                  className={navigationMenuTriggerVariants({
                    variant: "link",
                  })}
                >
                  {item.name}
                </RouterLink>
              </li>
            ))}
          </ul>
        </Popover>
      </PopoverTrigger>
    </nav>
  );
};

export { MobileNav, type MobileNavProps };
