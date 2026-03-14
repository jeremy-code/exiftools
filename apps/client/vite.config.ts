import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";

const viteConfig = defineConfig({
  plugins: [
    react({ babel: { plugins: ["babel-plugin-react-compiler"] } }),
    tailwindcss(),
  ],
  esbuild: {
    supported: {
      "top-level-await": true, // https://emscripten.org/docs/tools_reference/settings_reference.html#modularize
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
