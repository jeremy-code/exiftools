"use client";

import type { ReactNode } from "react";

import { ThemeProvider } from "next-themes";

/**
 * Provides global application context.
 */
const AppProvider = ({ children }: { children: Readonly<ReactNode> }) => {
  return <ThemeProvider>{children}</ThemeProvider>;
};

export { AppProvider };
