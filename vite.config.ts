/// <reference types="vitest" />

import process from 'node:process'
import { fileURLToPath } from 'node:url'
import vue from '@vitejs/plugin-vue'
import replace from '@rollup/plugin-replace'
import { visualizer } from 'rollup-plugin-visualizer'
import type { PluginOption } from 'vite'
import { defineConfig } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'
import { configDefaults } from 'vitest/config'
import type { ManifestOptions, VitePWAOptions } from 'vite-plugin-pwa'
import { VitePWA } from 'vite-plugin-pwa'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const sw = process.env.SW === 'true'
const claims = process.env.CLAIMS === 'true'
const pwaOptions: Partial<VitePWAOptions> = {
  base: '/',
  mode: process.env.SW_DEV === 'true' ? 'development' : 'production',
  includeAssets: ['*.ico', '*.svg', '*.png'],
  selfDestroying: process.env.SW_DESTROY === 'true',
  registerType: claims ? 'autoUpdate' : 'prompt',
  manifest: {
    name: 'Vue App',
    short_name: 'Vue App',
    description: 'Bulletproof Vue 3 SPA Template',
    theme_color: '#ffffff',
    icons: [
      {
        src: 'pwa-64x64.png',
        sizes: '64x64',
        type: 'image/png',
      },
      {
        src: 'pwa-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: 'pwa-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: 'maskable-icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
    ],
    display_override: ['window-controls-overlay'],
  },
  devOptions: {
    enabled: process.env.SW_DEV === 'true',
    type: process.env.SW === 'true' ? 'module' : 'classic',
    navigateFallbackAllowlist: [/^index.html$/],
  },
  workbox: {
    globPatterns: [
      '**/*.{html,css,js,json,txt,ico,svg,jpg,png,webp,woff,woff2,ttf,eot,otf,wasm}',
    ],
  },
}

if (sw) {
  pwaOptions.srcDir = 'src'
  pwaOptions.strategies = 'injectManifest'
  pwaOptions.filename = claims ? 'claims-sw.ts' : 'prompt-sw.ts';
  (pwaOptions.manifest as Partial<ManifestOptions>).name
    = 'PWA Inject Manifest';
  (pwaOptions.manifest as Partial<ManifestOptions>).short_name = 'PWA Inject'
}

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3330,
  },
  build: {
    sourcemap: process.env.SOURCE_MAP === 'true',
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    tsconfigPaths({ loose: true }),
    vue({
      template: {
        compilerOptions: {
          isCustomElement: tag => ['my-counter', 'dark-mode-switch'].includes(tag),
        },
      },
    }),
    visualizer({
      filename: 'html/visualizer-stats.html',
    }) as unknown as PluginOption,
    VitePWA(pwaOptions),
    replace({
      __DATE__: new Date().toISOString(),
      __RELOAD_SW__: process.env.RELOAD_SW === 'true' ? 'true' : 'false',
    }) as unknown as PluginOption,
  ],
  test: {
    root: fileURLToPath(new URL('./', import.meta.url)),
    deps: {
      inline: ['@vue', '@vueuse'],
    },
    // to see how your tests are running in real time in the terminal, add "default"
    // to generate HTML output and preview the results of your tests, add "html"
    reporters: ['default', 'html'],
    environment: 'jsdom', // mocking the DOM API
    globals: true, // use APIs globally like jest
    // testTransformMode: { web: [/\.[jt]sx$/] },
    testTransformMode: { web: ['/.[jt]sx$/'] },
    setupFiles: ['src/setup-test.ts'],
    exclude: [...configDefaults.exclude, 'e2e/*'],
    coverage: {
      provider: 'istanbul', // 'istanbul' / 'v8'
      reporter: ['text', 'json', 'html'],
      thresholds: {
        statements: 50,
        branches: 50,
        functions: 50,
        lines: 50,
      },
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
        'src/i18n/**',
      ],
    },
  },
})
