import {
  Select,
  type SelectProps,
  SelectItem,
} from "@exifi/ui/components/Select";

type EnumItem = {
  id: string;
  value: string;
};

type EnumSelectProps = {
  value: string;
  values: string[];
  onValueChange: (value: string) => void;
} & Omit<
  SelectProps<EnumItem, "single">,
  "value" | "onChange" | "children" | "items"
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
      items={values.map((value) => ({ id: value, value }))}
      onChange={(value) => {
        if (typeof value === "string") {
          onValueChange?.(value);
        }
      }}
    >
      {(item) => <SelectItem id={item.id}>{item.value}</SelectItem>}
    </Select>
  );
};

export { EnumSelect, type EnumSelectProps };
