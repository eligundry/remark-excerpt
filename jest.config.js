/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  testEnvironment: 'node',
  // collectCoverageFrom: ['src/**/*.spec.ts'],
  // coverageDirectory: '.coverage',
  // coverageThreshold: {
  //   global: {
  //     branches: 100,
  //     functions: 100,
  //     lines: 100,
  //     statements: 100,
  //   },
  // },
  // snapshotSerializers: ['jest-snapshot-serializer-raw'],
  testPathIgnorePatterns: ['build/*'],
  preset: 'ts-jest/presets/js-with-babel-esm',
  extensionsToTreatAsEsm: ['.ts'],
  globals: {
    'ts-jest': {
      useESM: true,
    },
  },
  transformIgnorePatterns: ['node_modules/(?!(remark))/'],
}
