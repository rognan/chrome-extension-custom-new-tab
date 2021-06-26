import {PlaywrightTestConfig} from '@playwright/test';
import * as path from 'path';

const config: PlaywrightTestConfig = {
  forbidOnly: !!process.env.CI,
  globalSetup: require.resolve('./playwright-setup.ts'),
  outputDir: path.join(__dirname, '..', 'build', 'playwright'),
  preserveOutput: 'always',
  retries: 0,
  testDir: path.join(__dirname, '..', 'test'),
  timeout: 15000,
  use: {
    browserName: 'chromium',
    headless: true
  },
  workers: process.env.CI ? 2 : undefined,
  projects: [
    {
      name: 'Chrome Stable',
      use: {
        browserName: 'chromium',
        // Test against Chrome Stable channel.
        channel: 'chrome'
      }
    }
  ]
};

export default config;