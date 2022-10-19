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
    'multiline-ternary': ['error', 'always-multiline'],
    'quotes': ['error', 'single'],
  },
}
