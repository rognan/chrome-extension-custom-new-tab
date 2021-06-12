module.exports = {
  rootDir: '..',
  moduleDirectories: ['node_modules', 'src'],
  setupFilesAfterEnv: ['<rootDir>/buildSrc/setupTest.js'],
  testEnvironment: 'jsdom'
};