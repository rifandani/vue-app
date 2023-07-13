import { fileURLToPath } from 'node:url'
import { mergeConfig } from 'vite'
import { configDefaults, defineConfig } from 'vitest/config'
import viteConfig from './vite.config'

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      root: fileURLToPath(new URL('./', import.meta.url)),
      // to see how your tests are running in real time in the terminal, add "default"
      // to generate HTML output and preview the results of your tests, add "html"
      reporters: ['default', 'html'],
      environment: 'jsdom', // mocking the DOM API
      globals: true, // use APIs globally like jest
      transformMode: { web: [/\.[jt]sx$/] },
      setupFiles: ['node_modules/@testing-library/jest-dom/extend-expect.js', 'src/setupTests.ts'],
      exclude: [...configDefaults.exclude, 'e2e/*'],
      // Will call .mockRestore() on all spies before each test. This will clear mock history and reset its implementation to the original one.
      restoreMocks: true,
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
          'src/setupTests.ts',
          'src/index.tsx',
          'src/mocks/**',
          'src/assets/**',
          'src/lib/**'
        ]
      }
    }
  })
)
