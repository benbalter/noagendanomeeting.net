import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "jsdom",
    include: ["tests/**/*.test.ts"],
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html", "lcov"],
      include: ["src/**/*.ts"],
      // Endpoints are exercised through the built dist/ output instead.
      exclude: ["src/pages/**"],
      thresholds: {
        statements: 90,
        branches: 80,
        functions: 100,
        lines: 90,
      },
    },
  },
});
