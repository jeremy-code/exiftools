import { Link as RouterLink } from "react-router";

import { Link } from "@exiftools/ui/components/Link";

const HomePage = () => {
  return (
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
  );
};

export { HomePage };
