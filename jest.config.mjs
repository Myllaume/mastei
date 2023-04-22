export default {
  // Indicates whether the coverage information should be collected while executing the test
  collectCoverage: true,

  // The directory where Jest should output its coverage files
  coverageDirectory: 'coverage',

  // An array of regexp pattern strings used to skip coverage collection
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/'],

  // A list of reporter names that Jest uses when writing coverage reports
  coverageReporters: ['text'],

  // An array of file extensions your modules use
  moduleFileExtensions: ['js', 'ts', 'tsx'],

  // Run tests from one or more projects
  projects: [
    {
      displayName: 'server',
      // The test environment that will be used for testing
      testEnvironment: 'jest-environment-node',

      // The glob patterns Jest uses to detect test files
      testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

      // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
      testPathIgnorePatterns: ['/node_modules/', '/dist/', '/views/'],
    },
    {
      displayName: 'views',
      // The test environment that will be used for testing
      testEnvironment: 'jest-environment-jsdom',

      // The glob patterns Jest uses to detect test files
      testMatch: ['**/?(*.)+(spec|test).[tj]s?(x)'],

      // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
      testPathIgnorePatterns: ['/node_modules/', '/dist/', '/server/'],
    },
  ],
};
