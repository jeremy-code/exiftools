import type { ComponentPropsWithRef, ReactNode } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@exifi/ui/components/Select";

type EnumSelectProps = {
  values: string[];
  placeholder?: ReactNode;
} & ComponentPropsWithRef<typeof Select>;

const EnumSelect = ({ values, placeholder, ...props }: EnumSelectProps) => {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent>
        {values.map((value) => (
          <SelectItem key={value} value={value}>
            {value}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { EnumSelect };
