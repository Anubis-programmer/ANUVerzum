/** @type {import('jest').Config} */
module.exports = {
    testEnvironment: 'jest-environment-jsdom',
    transform: {
        '^.+\\.(ts|tsx|js)$': [
            'babel-jest',
            {
                presets: [
                    ['@babel/preset-env', { targets: { node: 'current' }, modules: 'commonjs' }],
                    '@babel/preset-typescript'
                ],
                plugins: [
                    [
                        '@babel/plugin-transform-react-jsx',
                        { pragma: 'Anu.createElement', pragmaFrag: 'Anu.Fragment' }
                    ]
                ]
            }
        ]
    },
    testMatch: [
        '**/src/**/*.test.ts',
        '**/src/**/*.spec.ts'
    ],
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    moduleNameMapper: {
        '^anu-verzum$': '<rootDir>/src/index.ts',
        '^anu-verzum/testing$': '<rootDir>/src/testing/index.ts'
    },
    testEnvironmentOptions: {
        url: 'http://localhost'
    }
};
