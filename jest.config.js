module.exports = {
  preset: "ts-jest", // Use ts-jest to handle TypeScript files
  testEnvironment: "node", // Use Node.js environment for testing
  testMatch: [
    "**/test/**/*.test.ts", // Match unit tests in the test folder
    "**/e2e/**/*.test.ts", // Match E2E tests in the e2e folder
  ],
  moduleFileExtensions: ["ts", "js"], // Recognize TypeScript and JavaScript files
  transform: {
    "^.+\\.ts$": ["ts-jest", { tsconfig: "tsconfig.json" }], // ts-jest config goes here
  },
  setupFiles: ["dotenv/config"], // Load environment variables from .env
};
