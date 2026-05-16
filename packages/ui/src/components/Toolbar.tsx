import { ToggleButtonGroupContext } from "react-aria-components/ToggleButtonGroup";
import {
  Toolbar as AriaToolbar,
  type ToolbarProps,
} from "react-aria-components/Toolbar";
import { composeRenderProps } from "react-aria-components/composeRenderProps";
import { tv } from "tailwind-variants";

const toolbarVariants = tv({
  base: "flex flex-wrap gap-2",
  variants: {
    orientation: {
      horizontal: "flex-row items-center",
      vertical: "flex-col items-start",
    },
  },
});

const Toolbar = (props: ToolbarProps) => {
  return (
    <ToggleButtonGroupContext value={{ orientation: props.orientation }}>
      <AriaToolbar
        {...props}
        className={composeRenderProps(
          props.className,
          (className, renderProps) =>
            toolbarVariants({ ...renderProps, className }),
        )}
      />
    </ToggleButtonGroupContext>
  );
};

export { Toolbar, type ToolbarProps, toolbarVariants };
