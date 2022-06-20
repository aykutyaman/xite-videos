/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: "ts-jest",
  testEnvironment: "jsdom",
  // NOTE: if you don't set this correctly then when you reference
  // it later in a path string you'll get a confusing error message.
  // It says something like' Module <rootDir>/config/polyfills.js in
  // the setupFiles option was not found.'
  rootDir: "./",
  roots: ["<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["**/__tests__/**/*.+(test.ts|tsx)"],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  moduleNameMapper: {
    "\\.(css|less)$": "<rootDir>/__tests__/styleMock.js",
  },
  globals: {
    "ts-jest": {
      isolatedModules: true,
    },
  },
};
