import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      root: fileURLToPath(new URL('./', import.meta.url)),
      deps: {
        inline: ['@vue', '@vueuse']
      },
      // to see how your tests are running in real time in the terminal, add "default"
      // to generate HTML output and preview the results of your tests, add "html"
      reporters: ['default', 'html'],
      environment: 'jsdom', // mocking the DOM API
      globals: true, // use APIs globally like jest
      transformMode: { web: [/\.[jt]sx$/] },
      setupFiles: ['src/setup-test.ts'],
      exclude: [...configDefaults.exclude, 'e2e/*'],
      coverage: {
        provider: 'istanbul', // 'istanbul' / 'v8'
        reporter: ['text', 'json', 'html'],
        statements: 50,
        branches: 50,
        functions: 50,
        lines: 50,
        exclude: [
          'coverage/**',
          'dist/**',
          'packages/*/test{,s}/**',
          '**/*.d.ts',
          'cypress/**',
          'test{,s}/**',
          'test{,-*}.{js,cjs,mjs,ts,tsx,jsx}',
          '**/*{.,-}test.{js,cjs,mjs,ts,tsx,jsx}',
          '**/*{.,-}spec.{js,cjs,mjs,ts,tsx,jsx}',
          '**/__tests__/**',
          '**/{karma,rollup,webpack,vite,vitest,jest,ava,babel,nyc,cypress,tsup,build}.config.*',
          '**/.{eslint,mocha,prettier}rc.{js,cjs,yml}',
          // above is default
          'src/setup-test.ts',
          'src/main.ts',
          'src/mocks/**',
          'src/assets/**',
          'src/lib/**',
          'src/i18n/**'
        ]
      }
    }
  })
)
