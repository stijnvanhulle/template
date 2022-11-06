const aliases = [];
module.exports = {
  parser: "@typescript-eslint/parser",
  env: {
    commonjs: true,
    browser: true,
    es6: true,
    node: true,
    "jest/globals": true,
  },
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "airbnb/base", "plugin:prettier/recommended"],
  plugins: ["@typescript-eslint", "prettier", "jest", "formatjs", "unused-imports"],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 2020,
    sourceType: "module",
  },
  rules: {
    "@typescript-eslint/no-unused-vars": "warn",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-namespace": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/consistent-type-imports": "warn",
    "arrow-body-style": "off",
    "no-empty": "off",
    "global-require": "off",
    "no-empty-pattern": "warn",
    "no-debugger": "off",
    "no-unused-vars": "off",
    "no-plusplus": "off",
    "no-undef": "error",
    "no-continue": "off",
    "no-shadow": "off",
    "no-underscore-dangle": "off",
    "no-use-before-define": "off",
    "no-unused-expressions": "off",
    "class-methods-use-this": "off",
    "default-param-last": "off",
    "no-restricted-exports": "off",
    "no-constructor-return": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": ["warn", { vars: "all", varsIgnorePattern: "^_", args: "after-used", argsIgnorePattern: "^_" }],
    "import/prefer-default-export": "off",
    "import/no-dynamic-require": "off",
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "ignorePackages",
        jsx: "ignorePackages",
        ts: "ignorePackages",
        tsx: "ignorePackages",
      },
    ],
    "import/no-extraneous-dependencies": "off",
    "import/no-unresolved": "off",
    "import/order": [
      "error",
      {
        "newlines-between": "always",
        groups: ["builtin", "external", "internal", "index", "sibling", "parent", "object", "type"],
        pathGroups: [
          {
            pattern: "@stijnvanhulle/**",
            group: "external",
            position: "after",
          },
          {
            pattern: aliases.length ? `+(${aliases.join("|")})/**` : "",
            group: "internal",
            position: "before",
          },
        ],
        pathGroupsExcludedImportTypes: ["builtin"],
      },
    ],
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".ts", ".tsx", ".js", ".jsx"],
      },
    },
    react: {
      version: "detect",
    },
  },
  ignorePatterns: ["*.scss.d.ts", "*rc.js", "*.config.js", "**/types/**", "**/es/**", "**/lib/**", "**/umd/**"],
};
