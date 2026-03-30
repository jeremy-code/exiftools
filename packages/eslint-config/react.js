import { defineConfig, globalIgnores } from "@eslint/config-helpers";
import eslintReact from "@eslint-react/eslint-plugin";
import globals from "globals";
import pluginQuery from "@tanstack/eslint-plugin-query";
import reactCompiler from "eslint-plugin-react-compiler";
import reactHooks from "eslint-plugin-react-hooks";
import pluginRouter from "@tanstack/eslint-plugin-router";

import { baseConfig } from "./index.js";
import disables from "./disables.js";

export const reactConfig = defineConfig(
  globalIgnores(["dist"]),
  baseConfig,
  eslintReact.configs["recommended-type-checked"],
  pluginQuery.configs["flat/recommended"],
  reactCompiler.configs.recommended,
  reactHooks.configs.flat["recommended-latest"],
  pluginRouter.configs["flat/recommended"],
  {
    name: "@exiftools/eslint-config/react.js",
    rules: {
      "@typescript-eslint/no-misused-promises": [
        "error",
        {
          checksVoidReturn: {
            /**
             * Server actions must be async functions and may be passed to
             * `action` and `onSubmit` props, which return `void` and not
             * `Promise<void>`. This triggers `no-misused-promises`. However,
             * making it a synchronous function throws error "Functions cannot
             * be directly passed unless explicitly exposed with 'use server'".
             *
             * @see {@link https://typescript-eslint.io/rules/no-misused-promises/#checksvoidreturn}
             * @see {@link https://react.dev/reference/rsc/server-actions}
             */
            attributes: false,
          },
        },
      ],
      // https://tanstack.com/router/latest/docs/eslint/eslint-plugin-router#typescript-eslint
      "@typescript-eslint/only-throw-error": [
        "error",
        {
          allow: [
            {
              from: "package",
              package: "@tanstack/router-core",
              name: "Redirect",
            },
            {
              from: "package",
              package: "@tanstack/router-core",
              name: "NotFoundError",
            },
          ],
        },
      ],
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.serviceworker,
      },
    },
  },
);

export default reactConfig.concat(disables);
