import base from "../../jest.config.base";

import pack from "./package.json";

export default {
  ...base,
  displayName: pack.name,
  coverageReporters: [["lcov", { projectRoot: "tools/bodhi-nx" }]],
  testPathIgnorePatterns: ["<rootDir>/src/generators"],
  coveragePathIgnorePatterns: [
    ...base.coveragePathIgnorePatterns,
    "<rootDir>/src/executors",
    "<rootDir>/src/generators",
  ],
};
