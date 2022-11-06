const versionBuild = require("./.versionrc.json");

const types = versionBuild.types.map((typeItem) => typeItem.type);

module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    "type-enum": [2, "always", types],
  },
};
