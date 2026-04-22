/// <reference types="vite/client" />
import "../leaflet.css";

import type { ReactNode } from "react";

import {
  Outlet,
  createRootRoute,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";

import { Footer } from "#components/layout/Footer";
import { Navbar } from "#components/layout/Navbar";
import { AppProvider } from "#components/misc/AppProvider";
import uiCss from "@exiftools/ui/globals.css?url";

const RootDocument = ({ children }: Readonly<{ children: ReactNode }>) => {
  return (
    /**
     * @remarks
     * `suppressHydrationWarning` is necessary since `<html>` element must be
     * updated by `next-themes` for dark mode. The property only applies one
     * level deep, so hydration warnings won't be blocked on children elements.
     *
     * @see {@link https://react.dev/reference/react-dom/client/hydrateRoot#suppressing-unavoidable-hydration-mismatch-errors}
     */
    <html lang="en" suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
};

const RootComponent = () => {
  return (
    <RootDocument>
      <AppProvider>
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </AppProvider>
    </RootDocument>
  );
};

const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1.0" },
    ],
    links: [
      { href: "favicon.svg", rel: "shortcut icon", type: "image/svg" },
      { rel: "stylesheet", href: uiCss },
    ],
  }),
  component: RootComponent,
});

export { Route };
