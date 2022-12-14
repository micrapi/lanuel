module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript',
  ],
  ignorePatterns: [
    "client/routes/index.js",
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'dot-notation': ['off'],
    'multiline-ternary': ['error', 'always-multiline'],
    'quotes': ['error', 'single'],
  },
}
