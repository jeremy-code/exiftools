import { defineConfig } from "@eslint/config-helpers";
import eslintReact from "@eslint-react/eslint-plugin";
import tseslint from "typescript-eslint";

const JAVASCRIPT_GLOB_PATTERNS = ["**/*.{js,cjs,jsx,mjs}"];

export default defineConfig({
  files: JAVASCRIPT_GLOB_PATTERNS,
  extends: [
    tseslint.configs.disableTypeChecked,
    eslintReact.configs["disable-type-checked"],
  ],
});
