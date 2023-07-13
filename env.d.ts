/// <reference types="vite/client" />

import { SetupWorker } from 'msw'

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
