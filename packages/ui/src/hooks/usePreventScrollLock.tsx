import { useEffectEvent, useLayoutEffect } from "react";

const eventTypes = [
  "wheel",
  "scroll",
  "touchmove",
] satisfies (keyof WindowEventMap)[];

const options = {
  capture: true,
  passive: false,
} satisfies AddEventListenerOptions;

/**
 * @see {@link https://github.com/radix-ui/primitives/issues/3276#issuecomment-3567446826}
 */
const usePreventScrollLock = () => {
  const handler = useEffectEvent((event: WheelEvent | Event | TouchEvent) => {
    if (document.body.getAttribute("data-scroll-locked") === "1") {
      event.stopImmediatePropagation();
    }
  });

  useLayoutEffect(() => {
    eventTypes.forEach((type) => {
      window.addEventListener(type, handler, options);
    });

    return () => {
      eventTypes.forEach((type) => {
        window.removeEventListener(type, handler, options);
      });
    };
  }, []);
};

export { usePreventScrollLock };
