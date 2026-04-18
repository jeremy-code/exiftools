import type { ComponentPropsWithRef } from "react";

import { Fragment } from "react/jsx-runtime";

import { useBreakpoint } from "#hooks/useBreakpoint";
import { Input, type InputProps } from "@exiftools/ui/components/Input";

type GpsTagVersionInputProps = {
  value: number[];
  setValue: (value: number[]) => void;
  inputProps: InputProps;
  altText: string;
} & ComponentPropsWithRef<"div">;

const GpsTagVersionInput = ({
  className,
  value,
  setValue,
  inputProps,
  altText,
  ...props
}: GpsTagVersionInputProps) => {
  const breakpoint = useBreakpoint("max-sm");

  // There really isn't enough room to edit four values in one line
  if (breakpoint) {
    return altText;
  }

  return (
    <div className="flex items-baseline gap-1" {...props}>
      {value.map((byte, index) => (
        <Fragment key={index}>
          <Input
            {...inputProps}
            size="xs"
            type="number"
            value={byte}
            onChange={(e) => {
              if (!Number.isNaN(e.target.valueAsNumber)) {
                setValue(value.with(index, e.target.valueAsNumber));
              }
            }}
          />
          {index !== value.length - 1 && <span>.</span>}
        </Fragment>
      ))}
    </div>
  );
};

export { GpsTagVersionInput, type GpsTagVersionInputProps };
