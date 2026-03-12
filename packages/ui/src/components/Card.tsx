import { Slot } from "radix-ui";
import type { PrimitivePropsWithRef } from "radix-ui/internal";
import { cn } from "tailwind-variants";

const Card = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={cn(
        "rounded-lg border bg-surface text-foreground shadow-sm",
        className,
      )}
      {...props}
    />
  );
};

const CardHeader = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp
      className={cn("flex flex-col space-y-1.5 p-6", className)}
      {...props}
    />
  );
};

const CardTitle = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"h3">) => {
  const Comp = asChild ? Slot.Root : "h1";

  return (
    <Comp
      className={cn("text-lg/none font-semibold tracking-tight", className)}
      {...props}
    />
  );
};

const CardDescription = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"p">) => {
  const Comp = asChild ? Slot.Root : "p";

  return (
    <Comp
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  );
};

const CardContent = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot.Root : "div";

  return <Comp className={cn("p-6 pt-0", className)} {...props} />;
};

const CardFooter = ({
  className,
  asChild,
  ...props
}: PrimitivePropsWithRef<"div">) => {
  const Comp = asChild ? Slot.Root : "div";

  return (
    <Comp className={cn("flex items-center p-6 pt-0", className)} {...props} />
  );
};

export {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
};
