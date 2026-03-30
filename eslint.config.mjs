/** @import { Linter } from "eslint" */
import base from "@exiftools/eslint-config";

/**
 * @satisfies {Linter.Config[]}
 */
export default [{ ignores: ["apps/*", "packages/*"], ...base }];
