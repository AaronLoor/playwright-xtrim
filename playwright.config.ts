import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";

dotenv.config({ path: "./env/.env" });

export default defineConfig({
  testDir: "./tests",
  globalSetup: require.resolve('./utils/global-setup'),
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [["html"], ["allure-playwright", { outputFolder: "allure-results" }]],
  timeout: 90000,

  use: {
    trace: process.env.CI ? "on-first-retry" : "on",
    screenshot: "only-on-failure",
    video: "retain-on-failure",
    baseURL: process.env.BASE_URL,
    actionTimeout: 30000,
  },

  expect: {
    timeout: 30000,
  },

  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"],
        viewport: { width: 1920, height: 1080 },
       },
    },
    {
      name: "firefox",
      use: { ...devices["Desktop Firefox"],
        viewport: { width: 1280, height: 1024 },
       },
    },
    {
      name: "webkit",
      use: { ...devices["Desktop Safari"],
        viewport: { width: 1280, height: 800 },
       },
    },
  ],
});