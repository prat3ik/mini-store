// playwright.config.ts
// Starter config for tests against the mini store. `webServer` boots the dev
// server on :3100 when it is not already running. With TESTDINO_TOKEN set,
// every run streams to TestDino; without it the suite behaves the same.
import { defineConfig, devices, type ReporterDescription } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(__dirname, '.env') });

const isCI = !!process.env.CI;
const BASE_URL = process.env.BASE_URL || 'http://localhost:3100';

const reporters: ReporterDescription[] = [['list'], ['html', { open: 'never' }]];
if (process.env.TESTDINO_TOKEN) {
  reporters.push(['@testdino/playwright', { token: process.env.TESTDINO_TOKEN }]);
}

export default defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.ts',
  fullyParallel: true,
  forbidOnly: isCI,
  retries: isCI ? 1 : 0,
  workers: isCI ? 2 : 4,
  reporter: reporters,
  timeout: 30_000,
  expect: { timeout: 5_000 },
  use: {
    baseURL: BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    locale: 'en-US',
    testIdAttribute: 'data-testid',
  },
  webServer: {
    command: 'npm run dev',
    url: BASE_URL,
    reuseExistingServer: !isCI,
    timeout: 120_000,
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        // macOS 13 has no bundled Chromium; use the installed Google Chrome.
        channel: process.env.BROWSER_CHANNEL || 'chrome',
      },
    },
  ],
});
