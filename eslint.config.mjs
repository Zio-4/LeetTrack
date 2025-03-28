import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  {
    rules: {
      // Downgrade unused variables from error to warning
      "@typescript-eslint/no-unused-vars": "warn",
      
      // Disable the rule for unescaped entities
      "react/no-unescaped-entities": "off",
      
      // Other helpful rules that won't break builds
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "warn",
      "prefer-const": "warn",
      "no-duplicate-imports": "warn",
      "no-undef": "error",
      "no-empty": "warn",
      "no-extra-semi": "warn",
      "no-irregular-whitespace": "warn",
      "no-unreachable": "warn"
    },
    // Only apply these rules to specific file types
    files: ["**/*.js", "**/*.jsx", "**/*.ts", "**/*.tsx"],
    // Add globals for React
    languageOptions: {
      globals: {
        React: 'readonly'
      }
    }
  }
];

export default eslintConfig;
