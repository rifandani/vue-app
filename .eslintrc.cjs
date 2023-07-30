/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['testing-library', 'jest-dom'],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:tailwindcss/recommended',
    'plugin:jest-dom/recommended',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    'no-nested-ternary': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'warn',
    'testing-library/no-node-access': ['error', { allowContainerFirstChild: true }]
  },
  settings: {
    tailwindcss: {
      callees: ['tw', 'twMerge', 'twJoin'],
      config: 'tailwind.config.ts'
    }
  }
}
