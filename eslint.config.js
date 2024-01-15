import antfu from '@antfu/eslint-config'

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
  // vue/vue3-recommended.configs.recommended,
  // vuejs-accessibility/recommended.configs.recommended,
  // @vue/eslint-config-typescript.configs.recommended,
  // @vue/eslint-config-prettier/skip-formatting.configs.recommended,
  // @tanstack/eslint-plugin-query.configs.recommended,
  // tailwindcss.configs.recommended,
  // jest-dom.configs.recommended,
  // testing-library/vue.configs.recommended,
)
