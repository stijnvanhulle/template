module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", ["feat", "fix", "upgrade", "test", "chore", "docs", "perf"]],
  },
};
