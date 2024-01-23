import antfu from '@antfu/eslint-config'
import * as tanstackQuery from '@tanstack/eslint-plugin-query'
import * as jestDom from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'
import tailwindcss from 'eslint-plugin-tailwindcss'
import vueA11y from 'eslint-plugin-vuejs-accessibility'

export default antfu(
  {
    ignores: [
      '__mocks__',
      '.github',
      '.husky',
      '.vscode',
      '.yarn',
      'coverage',
      'dev-dist',
      'dist',
      'html',
      'public/mockServiceWorker.js',
      'src/i18n/*.ts',
    ],
    // typescript: {
    //   overrides: {
    //     'ts/consistent-type-imports': [
    //       'error',
    //       {
    //         prefer: 'type-imports',
    //         disallowTypeAnnotations: false,
    //       },
    //     ],
    //   },
    // },
    vue: true,
    svelte: false,
    react: false,
    jsx: false,
    componentExts: ['vue'],
    formatters: {
      /**
       * Format CSS, LESS, SCSS files, also the `<style>` blocks in Vue
       * By default uses Prettier
       */
      css: true,
      /**
       * Format HTML files
       * By default uses Prettier
       */
      html: true,
      /**
       * Format Markdown files
       * Supports Prettier and dprint
       * By default uses Prettier
       */
      markdown: 'prettier',
    },
  },
  {
    name: '@tanstack/query',
    files: ['src/**/*.{ts,tsx,vue}'],
    plugins: {
      '@tanstack/query': {
        rules: tanstackQuery.rules,
        configs: tanstackQuery.configs.recommended,
      },
    },
    rules: tanstackQuery.configs.recommended.rules,
  },
  {
    name: 'jest-dom',
    files: ['src/**/*.test.{ts,tsx}'],
    plugins: {
      'jest-dom': {
        rules: jestDom.rules,
        configs: jestDom.configs.recommended,
      },
    },
    rules: jestDom.configs.recommended.rules,
  },
  {
    name: 'testing-library',
    files: ['src/**/*.test.{ts,tsx}'],
    plugins: {
      'testing-library': {
        rules: testingLibrary.rules,
        configs: testingLibrary.configs.react,
      },
    },
    rules: testingLibrary.configs.react.rules,
  },
  {
    name: 'vuejs-accessibility',
    files: ['src/**/*.{ts,tsx,vue}'],
    plugins: {
      'vuejs-accessibility': {
        rules: vueA11y.rules,
        configs: vueA11y.configs.recommended,
      },
    },
    rules: { ...vueA11y.configs.recommended.rules, 'vuejs-accessibility/label-has-for': [
      'error',
      {
        controlComponents: ['InputText', 'Password', 'Dropdown'],
      },
    ] },
  },
  {
    name: 'tailwindcss',
    files: ['src/**/*.{ts,tsx,vue}'],
    plugins: {
      tailwindcss: {
        rules: tailwindcss.rules,
        configs: tailwindcss.configs.recommended,
      },
    },
    rules: {
      ...tailwindcss.configs.recommended.rules,
      'tailwindcss/no-custom-classname': 'off',
    },
  },
)
