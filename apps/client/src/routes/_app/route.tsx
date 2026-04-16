import { Outlet, createFileRoute } from "@tanstack/react-router";

import { FileTabs } from "#components/tabs/FileTabs";
import { FileTabsStoreProvider } from "#hooks/useFileTabsStore";

const AppLayoutComponent = () => {
  return (
    <FileTabsStoreProvider>
      <FileTabs>
        <Outlet />
      </FileTabs>
    </FileTabsStoreProvider>
  );
};

const Route = createFileRoute("/_app")({
  component: AppLayoutComponent,
  ssr: false,
});

export { Route };
