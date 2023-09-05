import { setupWorker, type SetupWorker } from 'msw'

// This configures a Service Worker with the given request handlers.
export const worker: SetupWorker = setupWorker()
