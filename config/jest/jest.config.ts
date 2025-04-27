import { JestConfigWithTsJest, pathsToModuleNameMapper } from 'ts-jest';
import { compilerOptions } from '../../tsconfig.paths.json';

const jestConfig: JestConfigWithTsJest = {
  preset: 'ts-jest',
  rootDir: '../../',
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.svg$': '<rootDir>/__mocks__/svg-transformer.js',
  },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/file-mock.js',
    '\\.(css|less)$': '<rootDir>/__mocks__/style-mock.js',
    ...pathsToModuleNameMapper(compilerOptions.paths, { prefix: '<rootDir>/' }),
  },
  collectCoverage: true,
  collectCoverageFrom: ['<rootDir>/src/**/*.{js,jsx,ts,tsx}', '!**/node_modules/**'],
  setupFilesAfterEnv: ['<rootDir>/config/jest/jest.setup.ts'],
};

export default jestConfig;
