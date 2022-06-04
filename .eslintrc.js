module.exports = {
  env: {
    browser: true,
  },
  extends: [
    'airbnb-base',
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
  },
  ignorePatterns: ['./esbuild.js'],
};
