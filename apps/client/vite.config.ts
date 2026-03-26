import babel from "@rolldown/plugin-babel";
import tailwindcss from "@tailwindcss/vite";
import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { Features } from "lightningcss";
import { defineConfig } from "vitest/config";

const viteConfig = defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ],
  css: {
    lightningcss: {
      exclude: Features.LightDark,
    },
  },
  /**
   * Otherwise, Vite errors `[commonjs--resolver] Module format "iife"
   * does not support top-level await. Use the "es" or "system" output formats
   * rather.` while building from libexif-wasm/dist/output/libexif.js
   **/
  worker: { format: "es" },
  // Otherwise, "wasm streaming compile failed" error
  optimizeDeps: { exclude: ["libexif-wasm"] },
  test: {
    clearMocks: true,
    browser: {
      enabled: true,
      instances: [{ browser: "chromium" }],
      provider: playwright(),
    },
  },
});

export default viteConfig;
