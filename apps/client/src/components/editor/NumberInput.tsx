import {
  NumberField,
  type NumberFieldProps,
} from "@exifi/ui/components2/NumberField";

type NumberInputProps = {
  value: number;
  onValueChange: (value: number) => void;
} & Omit<NumberFieldProps, "value">;

const NumberInput = ({ value, onValueChange, ...props }: NumberInputProps) => {
  return <NumberField {...props} value={value} onChange={onValueChange} />;
};

export { NumberInput, type NumberInputProps };
