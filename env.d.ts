/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/vue" />
/// <reference types="vite-plugin-pwa/client" />
/// <reference types="vite-plugin-pwa/info" />
/// <reference lib="webworker" />

import type { SetupWorker } from 'msw'
import type DarkModeSwitch from './src/lib/wc/dark-mode-switch.ce.vue'
import type MyCounter from './src/lib/wc/my-counter.ce.vue'

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string // prefixed with "VITE_" -> exposed to our Vite-processed code
  readonly VITE_API_BASE_URL: string // this WON'T be exposed to Vite-processed code
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare global {
  interface Window {
    msw: {
      worker: SetupWorker
    }
    /**
     * Toggle react query devtools in production
     */
    toggleRqDevtools: () => void
  }
}

declare module 'vue' {
  export interface GlobalComponents {
    'my-counter': typeof MyCounter
    'dark-mode-switch': typeof DarkModeSwitch
  }

  // export interface ComponentCustomProperties {
  //   vRipple: RippleOptions
  //   vStyleclass: StyleClassOptions
  // }
}

// declare module '@vue/runtime-core' {
//   export interface ComponentCustomProperties {
//     vRipple: RippleOptions
//     vRipple: typeof Ripple
//     vStyleclass: StyleClassOptions
//   }
// }
