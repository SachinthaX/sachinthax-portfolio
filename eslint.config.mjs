import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import eslintPluginAstro from "eslint-plugin-astro";

export default [
  {
    ignores: ["dist/**", ".astro/**", "node_modules/**", "docs/**"],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...eslintPluginAstro.configs.recommended,
  ...eslintPluginAstro.configs["jsx-a11y-recommended"],
  {
    files: ["**/*.mjs"],
    languageOptions: {
      globals: globals.node,
    },
  },
  {
    files: ["**/*.astro"],
    processor: "astro/client-side-ts",
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: tseslint.parser,
        extraFileExtensions: [".astro"],
      },
    },
  },
  {
    files: ["**/*.astro/*.ts"],
    languageOptions: {
      globals: globals.browser,
      parser: tseslint.parser,
      sourceType: "module",
      parserOptions: { project: null },
    },
  },
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
  },
];
