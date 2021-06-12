module.exports = {
  rootDir: '..',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '\\.(css)$': '<rootDir>/buildSrc/__mocks__/styleMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/buildSrc/setupTest.js'],
  testEnvironment: 'jsdom'
};