import type { Config } from '@jest/types';

export default {
    verbose: true,
    preset: 'ts-jest',
    testRegex: '.e2e.spec.ts$',
} as Config.InitialOptions;
