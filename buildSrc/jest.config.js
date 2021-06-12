module.exports = {
  rootDir: '..',
  moduleDirectories: ['node_modules', 'src'],
  moduleNameMapper: {
    '@js-src(.*)$': '<rootDir>/src$1',
    '\\.(css|less)$': '<rootDir>/buildSrc/__mocks__/styleMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/buildSrc/setupTest.js'],
  testEnvironment: 'jsdom'
};