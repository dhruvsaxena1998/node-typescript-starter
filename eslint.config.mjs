import antfu from "@antfu/eslint-config";
import drizzle from "eslint-plugin-drizzle";

export default antfu(
  {
    type: "app",
    typescript: true,
    formatters: true,
    stylistic: {
      indent: 2,
      semi: true,
      quotes: "double",
    },
    ignores: ["**/migrations/*"],
  },
  {
    rules: {
      "no-console": ["warn"],
      "antfu/no-top-level-await": ["off"],
      "node/prefer-global/process": ["off"],
      "node/no-process-env": ["error"],
      "style/brace-style": ["error", "1tbs"],
      "style/operator-linebreak": ["off"],
      "no-magic-numbers": [
        "error",
        {
          ignore: [0, 1],
          ignoreArrayIndexes: true,
        },
      ],
      "perfectionist/sort-imports": [
        "error",
        {
          internalPattern: ["@/**"],
        },
      ],
      "unicorn/filename-case": [
        "error",
        {
          case: "kebabCase",
          ignore: ["README.md"],
        },
      ],
    },
  },
  {
    plugins: {
      drizzle,
    },
    rules: {
      "drizzle/enforce-delete-with-where": ["error"],
      "drizzle/enforce-update-with-where": ["error"],
    },
  },
);
