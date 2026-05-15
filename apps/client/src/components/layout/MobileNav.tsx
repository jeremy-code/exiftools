import { useId, useState, type ComponentPropsWithRef } from "react";

import { Link as RouterLink } from "@tanstack/react-router";
import { cn } from "tailwind-variants";

import { Button, type ButtonProps } from "@exifi/ui/components/Button";
import { navigationMenuTriggerVariants } from "@exifi/ui/components/NavigationMenu";

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
        className="size-4 stroke-fg stroke-2"
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

type MobileNavProps = ComponentPropsWithRef<"div">;

const MobileNav = (props: Omit<MobileNavProps, "children">) => {
  const mobileNavigationMenuId = useId();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="sm:hidden" {...props}>
      <MobileNavButton
        onPress={() => setIsOpen((prev) => !prev)}
        data-state={isOpen ? "open" : "closed"}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        aria-expanded={isOpen}
        aria-controls={mobileNavigationMenuId}
      />
      {isOpen && (
        <nav
          id={mobileNavigationMenuId}
          role="navigation"
          // Height includes the border-bottom of the navbar (1px)
          className="absolute inset-x-0 top-[calc(100%+1px)] animate-in border-b bg-bg p-3 text-fg fade-in-50"
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
        </nav>
      )}
    </div>
  );
};

export { MobileNav, type MobileNavProps };
