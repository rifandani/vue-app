/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  parserOptions: {
    ecmaVersion: 'latest'
  },
  plugins: ['vuejs-accessibility', '@tanstack/query', 'testing-library', 'jest-dom'],
  extends: [
    'plugin:vue/vue3-recommended',
    'plugin:vuejs-accessibility/recommended',
    'plugin:tailwindcss/recommended',
    'plugin:@tanstack/eslint-plugin-query/recommended',
    'plugin:jest-dom/recommended',
    'plugin:testing-library/vue',
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  rules: {
    'no-nested-ternary': 'off',
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'warn',
    '@tanstack/query/exhaustive-deps': 'off',
    'testing-library/no-node-access': ['error', { allowContainerFirstChild: true }]
  },
  settings: {
    tailwindcss: {
      callees: ['classnames', 'clsx', 'ctl', 'tw', 'twMerge', 'twJoin'],
      config: 'tailwind.config.ts'
      // classRegex: '^class(Name)?$', // can be modified to support custom attributes. E.g. "^tw$" for `twin.macro`
    }
  }
}
