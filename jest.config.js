module.exports = {
    globals: {
        rollerJson: {}
    },
    moduleDirectories: ['node_modules', 'src'],
    moduleNameMapper: {
        '@js-src(.*)$': '<rootDir>/src$1',
        '\\.(css|less)$': '<rootDir>/src/__mocks__/styleMock.js'
    },
    setupFilesAfterEnv: ['<rootDir>/src/__mocks__/setupTest.js'],
    testEnvironment: 'jsdom'
};