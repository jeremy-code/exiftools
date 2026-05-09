"use client";

import { Moon, RefreshCw, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { composeRenderProps } from "react-aria-components";
import { Switch as AriaSwitch } from "react-aria-components/Switch";
import { cn } from "tailwind-variants";

import { useIsMounted } from "#hooks/useIsMounted";
import {
  SwitchTrack,
  SwitchHandle,
  switchVariants,
  type SwitchProps,
} from "@exifi/ui/components2/Switch";

type ThemeToggleProps = SwitchProps;

const ThemeToggle = ({ size, ...props }: ThemeToggleProps) => {
  // Prevent hydration error and layout shift as theme must be resolved from
  // `localStorage`
  const isMounted = useIsMounted();
  const { setTheme, resolvedTheme } = useTheme();
  const isLight = resolvedTheme === "light";

  const [ThemeIcon, themeIconLabel] =
    isMounted ?
      isLight ? [Sun, "Light Mode"]
      : [Moon, "Dark Mode"]
    : [RefreshCw, "Loading"];

  return (
    <AriaSwitch
      // Light mode = checked, Dark mode or not mounted = unchecked
      isSelected={isMounted && isLight}
      onChange={(isSelected) => setTheme(isSelected ? "light" : "dark")}
      isDisabled={!isMounted}
      aria-label={`Toggle ${themeIconLabel}`}
      {...props}
      className={composeRenderProps(props.className, (className, renderProps) =>
        switchVariants({ className, size, ...renderProps }),
      )}
    >
      <SwitchTrack>
        <SwitchHandle>
          <ThemeIcon
            aria-hidden
            size={16} // spacing.4 (1rem)
            className={cn({ "animate-spin": !isMounted })}
          />
        </SwitchHandle>
      </SwitchTrack>
    </AriaSwitch>
  );
};

export { ThemeToggle, type ThemeToggleProps };
