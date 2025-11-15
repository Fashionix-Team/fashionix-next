import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import unicorn from "eslint-plugin-unicorn";
import react from "eslint-plugin-react";
import jsxA11y from "eslint-plugin-jsx-a11y";
import unusedImports from "eslint-plugin-unused-imports";
import reactHooks from "eslint-plugin-react-hooks";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
});

const config = [
  {
    ignores: [
      "**/node_modules/**",
      "**/.next/**",
      "**/out/**",
      "**/build/**",
      "**/dist/**",
      "**/.cache/**",
      "**/public/**",
      "**/*.config.js",
      "**/*.config.mjs",
      "**/coverage/**",
      "**/.turbo/**",
    ],
  },
  ...compat.extends("next/core-web-vitals", "prettier"),
  {
    plugins: {
      unicorn,
      react,
      "jsx-a11y": jsxA11y,
      "unused-imports": unusedImports,
      "react-hooks": reactHooks,
    },
    settings: {
      react: {
        version: "detect",
      },
    },
    rules: {
      "no-unused-vars": [
        "error",
        {
          args: "after-used",
          caughtErrors: "none",
          ignoreRestSiblings: true,
          vars: "all",
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "prefer-const": "error",
      "react-hooks/exhaustive-deps": "error",
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
        },
      ],
    },
  },
];

export default config;
