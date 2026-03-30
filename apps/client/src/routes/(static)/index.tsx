import { createFileRoute, Link as RouterLink } from "@tanstack/react-router";

import { ThemeToggle } from "#components/misc/ThemeToggle";
import { Link } from "@exiftools/ui/components/Link";

const HomeComponent = () => {
  return (
    <>
      <ThemeToggle size="lg" />
      <ul>
        <li>
          <Link asChild>
            <RouterLink to="/editor">Editor</RouterLink>
          </Link>
        </li>
        <li>
          <Link asChild>
            <RouterLink to="/viewer">Viewer</RouterLink>
          </Link>
        </li>
      </ul>
    </>
  );
};

const Route = createFileRoute("/(static)/")({
  component: HomeComponent,
});

export { Route };
