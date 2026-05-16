import type { ComponentPropsWithRef } from "react";

import { Fragment } from "react/jsx-runtime";

import {
  NumberField,
  type NumberFieldProps,
} from "@exifi/ui/components/NumberField";

type GpsTagVersionInputProps = {
  value?: number[];
  onValueChange?: (value: number[]) => void;
  inputProps?: Omit<NumberFieldProps, "value" | "onChange">;
} & ComponentPropsWithRef<"div">;

const GpsTagVersionInput = ({
  className,
  value,
  onValueChange,
  inputProps,
  ...props
}: GpsTagVersionInputProps) => {
  return (
    <div className="flex items-baseline gap-1" {...props}>
      {value?.map((byte, index) => (
        <Fragment key={index}>
          <NumberField
            size="xs"
            {...inputProps}
            aria-label={`${inputProps?.["aria-label"] ?? "GPS Tag Version"}+${index + 1}`}
            value={byte}
            onChange={(number) => onValueChange?.(value.with(index, number))}
          />
          {index !== value.length - 1 && <span>.</span>}
        </Fragment>
      ))}
    </div>
  );
};

export { GpsTagVersionInput, type GpsTagVersionInputProps };
