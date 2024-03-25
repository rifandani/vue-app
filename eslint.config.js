import antfu from '@antfu/eslint-config'
import * as tanstackQuery from '@tanstack/eslint-plugin-query'
import * as jestDom from 'eslint-plugin-jest-dom'
import testingLibrary from 'eslint-plugin-testing-library'
import tailwindcss from 'eslint-plugin-tailwindcss'
import a11y from 'eslint-plugin-vuejs-accessibility'
import * as storybook from 'eslint-plugin-storybook'

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
      'commitlint.config.js',
      'commitlint.config.cjs',
      'tailwind.config.cjs',
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
      },
    },
    rules: testingLibrary.configs.react.rules,
  },
  {
    name: 'vuejs-accessibility',
    files: ['src/**/*.{ts,tsx,vue}'],
    plugins: {
      'vuejs-accessibility': {
        rules: a11y.rules,
      },
    },
    rules: a11y.configs.recommended.rules,
  },
  {
    name: 'tailwindcss',
    files: ['src/**/*.{ts,tsx,vue}'],
    plugins: {
      tailwindcss: {
        rules: tailwindcss.rules,
      },
    },
    rules: {
      ...tailwindcss.configs.recommended.rules,
      'tailwindcss/no-custom-classname': 'off',
    },
  },
  {
    name: 'storybook',
    files: storybook.configs.recommended.overrides[0].files,
    plugins: {
      storybook: {
        rules: storybook.rules,
      },
    },
    rules: storybook.configs.recommended.overrides[0].rules,
  },
  {
    name: 'storybook-main',
    files: storybook.configs.recommended.overrides[1].files,
    plugins: {
      'storybook-main': {
        rules: storybook.rules,
      },
    },
    rules: {
      'storybook-main/no-uninstalled-addons': 'error',
    },
  },
)
