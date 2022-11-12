const { pathsToModuleNameMapper } = require('ts-jest');

const tsconfig = require('./tsconfig.json');

const baseConfig = require('../../jest.config.js');

const packageName = 'core';

module.exports = {
  ...baseConfig,
  rootDir: '../..',
  roots: [`<rootDir>/packages/${packageName}`],
  displayName: packageName,
  globals: {},
  moduleNameMapper: {
    ...pathsToModuleNameMapper(tsconfig.compilerOptions.paths, { prefix: `<rootDir>/packages/${packageName}` }),
  },
};
