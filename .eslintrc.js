module.exports = {
    plugins: ['react-hooks', 'react-native'],
    env: {
        es6: true,
        node: true,
        browser: true,
    },
    parser: 'babel-eslint',
    parserOptions: {
        ecmaVersion: 8,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
    ignorePatterns: ['/node_modules/**', '/build/**'],
    rules: {
        'no-unused-vars': ['warn', { args: 'none', argsIgnorePattern: 'req|res|next|val' }],
    },
    settings: {
        react: {
            version: 'detect',
        },
    },
};
