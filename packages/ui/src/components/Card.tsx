import type { ComponentPropsWithRef } from "react";

import {
  Heading,
  type HeadingProps as CardTitleProps,
} from "react-aria-components/Heading";
import {
  Text,
  type TextProps as CardDescriptionProps,
} from "react-aria-components/Text";
import { cn } from "tailwind-variants";

type CardProps = ComponentPropsWithRef<"div">;

const Card = ({ className, ...props }: CardProps) => {
  return (
    <div
      className={cn(
        "rounded-lg border bg-surface text-fg shadow-sm",
        className,
      )}
      {...props}
    />
  );
};

type CardHeaderProps = ComponentPropsWithRef<"div">;

const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return (
    <div
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
};

const CardTitle = ({ className, level = 2, ...props }: CardTitleProps) => {
  return (
    <Heading
      level={level}
      className={cn("text-lg/none font-semibold tracking-tight", className)}
      {...props}
    />
  );
};

const CardDescription = ({ className, ...props }: CardDescriptionProps) => {
  return (
    <Text
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
};

type CardContentProps = ComponentPropsWithRef<"div">;

const CardContent = ({ className, ...props }: CardContentProps) => {
  return <div className={cn("p-6 pt-0", className)} {...props} />;
};

type CardFooterProps = ComponentPropsWithRef<"div">;

const CardFooter = ({ className, ...props }: CardFooterProps) => {
  return (
    <div className={cn("flex items-center p-6 pt-0", className)} {...props} />
  );
};

export {
  Card,
  type CardProps,
  CardHeader,
  type CardHeaderProps,
  CardTitle,
  type CardTitleProps,
  CardDescription,
  type CardDescriptionProps,
  CardContent,
  type CardContentProps,
  CardFooter,
  type CardFooterProps,
};
