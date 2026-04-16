import { createFileRoute, Link as RouterLink } from "@tanstack/react-router";

import { FileTabs } from "#components/tabs/FileTabs";
import { FileTabsStoreProvider } from "#hooks/useFileTabsStore";
import { Link } from "@exiftools/ui/components/Link";

const HomeComponent = () => {
  return (
    <>
      <ul className="list-disc [&_ul]:list-[revert]">
        <li>
          <Link color="link" underline asChild>
            <RouterLink to="/editor">Editor</RouterLink>
          </Link>
          <ul className="list-disc pl-3">
            <li>
              <Link color="link" underline asChild>
                <RouterLink to="/editor/gps">GPS Editor</RouterLink>
              </Link>
            </li>
          </ul>
        </li>
        <li>
          <Link color="link" underline asChild>
            <RouterLink to="/viewer">Viewer</RouterLink>
          </Link>
        </li>
        <li>
          <Link color="link" underline asChild>
            <RouterLink to="/tags">Tags</RouterLink>
          </Link>
        </li>
      </ul>
      <FileTabsStoreProvider>
        <FileTabs />
      </FileTabsStoreProvider>
    </>
  );
};

const Route = createFileRoute("/(static)/")({
  component: HomeComponent,
});

export { Route };
