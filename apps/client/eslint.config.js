/** @import { Linter } from "eslint" */
import reactEslintConfig from "@exiftools/eslint-config/react.js";

/**
 * @satisfies {Linter.Config[]}
 */
export default [...reactEslintConfig, { ignores: ["./src/routeTree.gen.ts"] }];
