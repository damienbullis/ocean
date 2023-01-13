import path from 'path';

export default {
  roots: ['<rootDir>/src/'],
  transform: {
    '^.+\\.[t|j]sx?$': ['babel-jest', { cwd: __dirname, rootMode: 'upward' }],
  },
  verbose: true,
  moduleNameMapper: {},
  collectCoverageFrom: ['src/**/*.{js,jsx,tsx,ts}', '!**/*.scss.d.ts', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>/setupTests.ts'],
  transformIgnorePatterns: ['/node_modules/(?!(imask)/)'],
  coveragePathIgnorePatterns: [],
  coverageReporters: ['lcov', 'text-summary'],
  coverageDirectory: './reports/coverage/jest',
  globals: {},
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
