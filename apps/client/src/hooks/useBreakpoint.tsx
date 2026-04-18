import { useEffect, useEffectEvent, useState } from "react";

type Breakpoint = "sm" | "md" | "lg" | "xl" | "2xl";

type BreakpointWithUtility = Breakpoint | `max-${Breakpoint}`;

const useBreakpoint = (breakpoint: BreakpointWithUtility) => {
  const breakpointValue = window
    .getComputedStyle(document.body)
    .getPropertyValue(
      `--breakpoint-${breakpoint.startsWith("max-") ? breakpoint.slice("max-".length) : breakpoint}`,
    );
  const [matches, setMatches] = useState(false);
  const handleChange = useEffectEvent((event: MediaQueryListEvent) =>
    setMatches(event.matches),
  );

  useEffect(() => {
    const mediaQueryList =
      breakpoint.startsWith("max-") ?
        window.matchMedia(`(width < ${breakpointValue})`)
      : window.matchMedia(`(width >= ${breakpointValue})`);

    mediaQueryList.addEventListener("change", handleChange);

    return () => {
      mediaQueryList.removeEventListener("change", handleChange);
    };
  });

  return matches;
};

export { useBreakpoint };
