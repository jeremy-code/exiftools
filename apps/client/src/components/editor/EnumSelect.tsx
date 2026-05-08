import type { ComponentPropsWithRef } from "react";

import { Select, SelectItem } from "@exifi/ui/components2/Select";

type EnumSelectProps = {
  value: string;
  values: string[];
  onValueChange: (value: string) => void;
} & Omit<
  ComponentPropsWithRef<typeof Select>,
  "value" | "onChange" | "children"
>;

const EnumSelect = ({
  value,
  values,
  onValueChange,
  ...props
}: EnumSelectProps) => {
  return (
    <Select
      {...props}
      value={value}
      onChange={(value) => {
        if (typeof value === "string" && values.includes(value)) {
          onValueChange?.(value);
        }
      }}
    >
      {values.map((value) => (
        <SelectItem id={value} key={value}>
          {value}
        </SelectItem>
      ))}
    </Select>
  );
};

export { EnumSelect, type EnumSelectProps };
