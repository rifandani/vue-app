import type { Environment } from '#shared/types/global'
import { isBrowser } from '#shared/utils/helper'

export const ENVIRONMENT: Environment = {
  browser: isBrowser(),
  server: !isBrowser(),
} as const

export const DEFAULT_WINDOW = ENVIRONMENT.browser ? window : undefined
export const DEFAULT_DOCUMENT = ENVIRONMENT.browser ? window.document : undefined
export const DEFAULT_NAVIGATIOR = ENVIRONMENT.browser ? window.navigator : undefined
export const DEFAULT_LOCATION = ENVIRONMENT.browser ? window.location : undefined
