module.exports = {
  "testEnvironment": "node",
  "testMatch": [
    "**/audit-tests/**/*.test.js"
  ],
  "collectCoverage": true,
  "coverageDirectory": "audit-results/coverage",
  "setupFilesAfterEnv": [
    "<rootDir>/audit-tests/setup.js"
  ]
};