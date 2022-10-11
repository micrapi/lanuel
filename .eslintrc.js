module.exports = {
  root: true,
  extends: [
    '@nuxtjs/eslint-config-typescript',
  ],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'quotes': ['error', 'single'],
  },
}
