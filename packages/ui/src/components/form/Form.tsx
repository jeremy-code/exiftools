import { Form as AriaForm, type FormProps } from "react-aria-components/Form";
import { tv } from "tailwind-variants";

const formVariants = tv({
  base: ["flex flex-col gap-6", "[&>button]:self-start"],
  variants: {
    role: {
      search: null,
      presentation: null,
      alert: [
        "max-w-62.5 border-2 border-destructive p-3 outline-0",
        "focus:outline-2 focus:outline-offset-2 focus:outline-blue-600",
        "[&>h3]:mt-0",
        "[&>p]:mb-0",
      ],
    },
  },
});

const Form = ({ className, role, ...props }: FormProps) => {
  return (
    <AriaForm
      className={formVariants({ className, role })}
      role={role}
      {...props}
    />
  );
};

export { Form, type FormProps, formVariants };
