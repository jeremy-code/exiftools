import {
  TanStackDevtools,
  type TanStackDevtoolsReactInit,
  type TanStackDevtoolsReactPlugin,
} from "@tanstack/react-devtools";
import { formDevtoolsPlugin } from "@tanstack/react-form-devtools";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

const devtoolsPlugins = [
  {
    name: "TanStack Query",
    // https://github.com/TanStack/devtools/blob/main/packages/devtools-utils/src/react/plugin.tsx
    render: (_el, props) => <ReactQueryDevtoolsPanel {...props} />,
  },
  {
    name: "TanStack Router",
    render: <TanStackRouterDevtools />,
  },
  formDevtoolsPlugin(),
] satisfies TanStackDevtoolsReactPlugin[];

const Devtools = (props: TanStackDevtoolsReactInit) => {
  return <TanStackDevtools plugins={devtoolsPlugins} {...props} />;
};

export { Devtools };
