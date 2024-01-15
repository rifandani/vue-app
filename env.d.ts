/// <reference types="vite/client" />

import type { SetupWorker } from 'msw'
import type { RippleOptions } from 'primevue/ripple'
import type DarkModeSwitch from './src/lib/wc/DarkModeSwitch.ce.vue'
import type MyCounter from './src/lib/wc/MyCounter.ce.vue'

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

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    vRipple: RippleOptions
    // vRipple: typeof Ripple
    // vStyleclass: StyleClassOptions
  }
}
