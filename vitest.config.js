import { defineConfig } from "vitest/config";
export default defineConfig({
  test: {
    include: ["**/*.test.js"],
    exclude: ["node_modules/**", "coverage/**"],
    coverage: {
      provider: "v8",
      reporter: ["text", "html"],
      reportsDirectory: "./coverage",
      all: true,
      include: ["controllers/**/*.js", "server.js"],
      exclude: [
        "**/*.test.js",
        "controllers/tests/**",
        "routes/**",
        "models/**",
        "coverage/**",
        "node_modules/**",
      ],
      thresholds: {
        lines: 80,
        functions: 80,
        statements: 80,
        branches: 80,
      },
    },
  },
});
