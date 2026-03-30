import reactEslintConfig from "@exiftools/eslint-config/react.js";

export default [...reactEslintConfig, { ignores: ["./src/routeTree.gen.ts"] }];
