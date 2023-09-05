import type { Environment } from '@shared/types/global.type'
import type { Theme } from '@shared/types/theme.type'
import { isBrowser } from '@shared/utils/helper/helper.util'

export const themes: Theme[] = [
  'auto',
  'light',
  'dark',
  'cupcake',
  'bumblebee',
  'emerald',
  'corporate',
  'synthwave',
  'retro',
  'cyberpunk',
  'valentine',
  'halloween',
  'garden',
  'forest',
  'aqua',
  'lofi',
  'pastel',
  'fantasy',
  'wireframe',
  'black',
  'luxury',
  'dracula',
  'cmyk',
  'autumn',
  'business',
  'acid',
  'lemonade',
  'night',
  'coffee',
  'winter'
]

// object version of `themes`
export const modes = themes.reduce((acc, item) => {
  acc[item] = item
  return acc
}, {} as Record<Theme, Theme>)

// Commonly used keyboard constants
export const ESCAPE = 'Escape'
export const LEFT_ARROW = 'ArrowLeft'
export const UP_ARROW = 'ArrowUp'
export const RIGHT_ARROW = 'ArrowRight'
export const DOWN_ARROW = 'ArrowDown'
export const HOME = 'Home'
export const END = 'End'
export const TAB = 'Tab'
export const SPACE = ' '
export const ENTER = 'Enter'

// environments
export const environment: Environment = {
  browser: isBrowser(),
  server: !isBrowser()
} as const

export const defaultWindow = environment.browser ? window : undefined
export const defaultDocument = environment.browser ? window.document : undefined
export const defaultNavigator = environment.browser ? window.navigator : undefined
export const defaultLocation = environment.browser ? window.location : undefined
