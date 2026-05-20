import { useState, type ComponentPropsWithRef } from "react";

import { Fragment } from "react/jsx-runtime";

import {
  NumberField,
  type NumberFieldProps,
} from "@exifi/ui/components/NumberField";

const NUMBER_OF_DIGITS = 4;

type GpsTagVersionTuple = [
  number | undefined,
  number | undefined,
  number | undefined,
  number | undefined,
];

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
  const [gpsTagVersion, setGpsTagVersion] = useState<GpsTagVersionTuple>([
    value?.at(0),
    value?.at(1),
    value?.at(2),
    value?.at(3),
  ]);

  return (
    <div className="flex items-baseline gap-1" {...props}>
      {gpsTagVersion.map((byte, index) => (
        <Fragment key={index}>
          <NumberField
            size="xs"
            {...inputProps}
            aria-label={`${inputProps?.["aria-label"] ?? "GPS Tag Version"}+${index + 1}`}
            value={byte}
            onChange={(number) => {
              setGpsTagVersion(
                (prev) => prev.with(index, number) as GpsTagVersionTuple,
              );
              if (
                gpsTagVersion.at(0) !== undefined &&
                gpsTagVersion.at(1) !== undefined &&
                gpsTagVersion.at(2) !== undefined &&
                gpsTagVersion.at(3) !== undefined
              ) {
                onValueChange?.(gpsTagVersion as number[]);
              }
            }}
          />
          {index !== NUMBER_OF_DIGITS - 1 && <span>.</span>}
        </Fragment>
      ))}
    </div>
  );
};

export { GpsTagVersionInput, type GpsTagVersionInputProps };
