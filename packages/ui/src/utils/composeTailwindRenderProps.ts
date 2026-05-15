import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { twMerge, type ClassNameValue } from "tailwind-merge";

const composeTailwindRenderProps = <T>(
  className: string | ((renderProps: T) => string) | undefined,
  tw: ClassNameValue,
): string | ((v: T) => string) => {
  return composeRenderProps(className, (className) => twMerge(tw, className));
};

export { composeTailwindRenderProps };
