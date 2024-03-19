import { z } from 'zod'

export const envSchema = z.object({
  VITE_APP_TITLE: z.string(),
  VITE_API_BASE_URL: z.string().url(),
})

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
