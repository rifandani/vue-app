import { z } from 'zod'
import type { Environment } from '#shared/types/global'
import { isBrowser } from '#shared/utils/helper'

export const envSchema = z.object({
  VITE_APP_TITLE: z.string(),
  VITE_API_BASE_URL: z.string().url(),
})
export const ENVIRONMENT: Environment = {
  browser: isBrowser(),
  server: !isBrowser(),
} as const

export const DEFAULT_WINDOW = ENVIRONMENT.browser ? window : undefined
export const DEFAULT_DOCUMENT = ENVIRONMENT.browser ? window.document : undefined
export const DEFAULT_NAVIGATIOR = ENVIRONMENT.browser ? window.navigator : undefined
export const DEFAULT_LOCATION = ENVIRONMENT.browser ? window.location : undefined

export const env = (() => {
  let appTitle = 'unknown-VITE_APP_TITLE'
  let apiBaseUrl = 'unknown-VITE_API_BASE_URL'

  if (import.meta.env.VITE_APP_TITLE)
    appTitle = envSchema.shape.VITE_APP_TITLE.parse(import.meta.env.VITE_APP_TITLE)
  if (import.meta.env.VITE_API_BASE_URL)
    apiBaseUrl = envSchema.shape.VITE_API_BASE_URL.parse(import.meta.env.VITE_API_BASE_URL)

  return {
    appTitle,
    apiBaseUrl,
  }
})()
