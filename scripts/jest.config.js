module.exports = {
  rootDir: null,
  roots: ['../src'],
  collectCoverage: true,
  coverageDirectory: 'coverage',
  coveragePathIgnorePatterns: [
    "/node_modules/"
  ],
  coverageReporters: ['text-summary'],
  moduleDirectories: ['node_modules'],
  testEnvironment: 'jsdom',
  testMatch: [
    "**/__tests__/**/*.js"
  ],
  testPathIgnorePatterns: [
    "/node_modules/"
  ]
};