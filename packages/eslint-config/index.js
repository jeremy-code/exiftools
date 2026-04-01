import { defineConfig } from "@eslint/config-helpers";
import comments from "@eslint-community/eslint-plugin-eslint-comments/configs";
import eslint from "@eslint/js";
import globals from "globals";
import { createTypeScriptImportResolver } from "eslint-import-resolver-typescript";
import pluginImportX, { createNodeResolver } from "eslint-plugin-import-x";
import pluginPromise from "eslint-plugin-promise";
import turbo from "eslint-plugin-turbo";
import tseslint from "typescript-eslint";
import vitest from "@vitest/eslint-plugin";

import disables from "./disables.js";

export const baseConfig = defineConfig(
  eslint.configs.recommended,
  tseslint.configs.recommendedTypeChecked,
  comments.recommended,
  pluginImportX.flatConfigs.recommended,
  pluginImportX.flatConfigs.typescript,
  pluginPromise.configs["flat/recommended"],
  turbo.configs["flat/recommended"],
  {
    name: "@exiftools/eslint-config/index.js",
    languageOptions: {
      parserOptions: {
        /**
         * Automatically load `tsconfig.json` files for typed linting rules
         *
         * @see {@link https://typescript-eslint.io/packages/parser/#projectservice}
         */
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
      globals: { ...globals.node },
    },
    rules: {
      /**
       * Single extends when using declaration merging can be useful
       *
       * @see {@link https://typescript-eslint.io/rules/unbound-method/}
       */
      "@typescript-eslint/no-empty-object-type": [
        "error",
        { allowInterfaces: "with-single-extends" },
      ],
      /**
       * I intend to use TS Enums like "a namespaced bag of values"
       *
       * @see {@link https://typescript-eslint.io/rules/no-unsafe-enum-comparison/}
       */
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      /**
       * @see {@link https://typescript-eslint.io/rules/unbound-method/}
       */
      "@typescript-eslint/unbound-method": ["error", { ignoreStatic: true }],
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/exports-last.md}
       */
      "import-x/exports-last": "error",
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/group-exports.md}
       */
      "import-x/group-exports": "error",
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/newline-after-import.md}
       */
      "import-x/newline-after-import": ["error", { considerComments: true }],
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x/blob/master/docs/rules/order.md}
       */
      "import-x/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling", "index"],
          ],
          pathGroups: [
            { pattern: "#*", group: "internal" },
            {
              pattern: "react{,-dom{,/server,/client,/static}}",
              group: "builtin",
            },
          ],
          pathGroupsExcludedImportTypes: ["object"],
          distinctGroup: false,
          "newlines-between": "always",
          alphabetize: { order: "asc" },
        },
      ],
    },
    settings: {
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x#import-xinternal-regex}
       */
      "import-x/internal-regex": "^@exiftools/",
      /**
       * @see {@link https://github.com/un-ts/eslint-plugin-import-x#resolvers}
       */
      "import-x/resolver-next": [
        createTypeScriptImportResolver({ alwaysTryTypes: true }),
        createNodeResolver(),
      ],
    },
  },
  {
    files: ["**/*.test.{ts,tsx}"],
    extends: [vitest.configs.recommended],
    rules: {
      /**
       * @see {@link https://github.com/vitest-dev/eslint-plugin-vitest/blob/main/docs/rules/prefer-importing-vitest-globals.md}
       */
      "vitest/prefer-importing-vitest-globals": "error",
    },
    settings: {
      vitest: {
        typecheck: true,
      },
    },
  },
);

export default baseConfig.concat(disables);
