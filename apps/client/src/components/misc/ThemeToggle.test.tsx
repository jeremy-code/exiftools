import { describe, expect, vi, test, beforeEach } from "vitest";
import { render } from "vitest-browser-react";

import { ThemeToggle } from "./ThemeToggle";

let mockResolvedTheme = "light";
const mockSetTheme = vi.fn();

vi.mock("next-themes", () => ({
  useTheme: () => ({
    resolvedTheme: mockResolvedTheme,
    setTheme: mockSetTheme,
  }),
}));

describe("ThemeToggle", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("renders light mode state correctly", async () => {
    mockResolvedTheme = "light";

    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    expect(screen.getByLabelText("Switch to dark theme")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).not.toHaveAttribute(
      "data-selected",
      "true",
    );
  });

  test("renders dark mode state correctly", async () => {
    mockResolvedTheme = "dark";

    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    expect(screen.getByLabelText("Switch to light theme")).toBeInTheDocument();
    expect(screen.getByTestId("theme-toggle")).toHaveAttribute(
      "data-selected",
      "true",
    );
  });

  test("switches to dark theme when clicked in light mode", async () => {
    mockResolvedTheme = "light";

    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    await screen.getByTestId("theme-toggle").click();

    expect(mockSetTheme).toHaveBeenCalledOnce();
    expect(mockSetTheme).toHaveBeenCalledExactlyOnceWith("dark");
  });

  test("switches to light theme when clicked in dark mode", async () => {
    mockResolvedTheme = "dark";

    const screen = await render(<ThemeToggle data-testid="theme-toggle" />);

    await screen.getByTestId("theme-toggle").click();

    expect(mockSetTheme).toHaveBeenCalledOnce();
    expect(mockSetTheme).toHaveBeenCalledExactlyOnceWith("light");
  });

  test("renders children", async () => {
    const screen = await render(<ThemeToggle>Theme</ThemeToggle>);

    expect(screen.getByText("Theme")).toBeInTheDocument();
  });
});
