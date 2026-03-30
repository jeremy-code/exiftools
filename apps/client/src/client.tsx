import { hydrateRoot } from "react-dom/client";

import { StartClient } from "@tanstack/react-start/client";

/**
 * Omitting usage of <StrictMode> since useEffect running twice in development
 * causes issues with ExifData memory management in the app since `free()` is
 * not guaranteed to be idempotent.
 */
hydrateRoot(document, <StartClient />);
