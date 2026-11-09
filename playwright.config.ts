import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/browser",
  fullyParallel: true,
  use: {
    baseURL: "http://127.0.0.1:3100",
    trace: "retain-on-failure",
  },
  webServer: {
    command: `"${process.execPath}" node_modules/next/dist/bin/next dev --hostname 127.0.0.1 --port 3100`,
    url: "http://127.0.0.1:3100",
    reuseExistingServer: false,
    env: {
      NEXT_PUBLIC_WHATSAPP_NUMBER: "5500000000000",
      ...(process.env.FEATURED_PRODUCT_IDS !== undefined && {
        FEATURED_PRODUCT_IDS: process.env.FEATURED_PRODUCT_IDS,
      }),
    },
  },
});
