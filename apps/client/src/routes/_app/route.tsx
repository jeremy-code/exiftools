import { Outlet, createFileRoute } from "@tanstack/react-router";

import { FileTabs } from "#components/tabs/FileTabs";

const AppLayoutComponent = () => {
  return (
    <FileTabs>
      <Outlet />
    </FileTabs>
  );
};

const Route = createFileRoute("/_app")({
  component: AppLayoutComponent,
  ssr: false,
});

export { Route };
