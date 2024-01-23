import antfu from '@antfu/eslint-config'
import * as tanstackQuery from '@tanstack/eslint-plugin-query'
import * as jestDom from 'eslint-plugin-jest-dom'

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
  // vue/vue3-recommended.configs.recommended,
  // vuejs-accessibility/recommended.configs.recommended,
  // @vue/eslint-config-typescript.configs.recommended,
  // @vue/eslint-config-prettier/skip-formatting.configs.recommended,
  // tailwindcss.configs.recommended,
  // testing-library/vue.configs.recommended,
)
