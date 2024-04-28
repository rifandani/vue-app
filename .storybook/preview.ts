import { type Decorator, type Preview, setup } from '@storybook/vue3'
import { createPinia } from 'pinia'
import { createI18n } from 'vue-i18n'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { withThemeByClassName } from '@storybook/addon-themes'
import enUS from '../src/i18n/en-US.json'
import idID from '../src/i18n/id-ID.json'
import '../src/main.css'

setup((app) => {
  // Type-define 'en-US' as the master schema for the resource
  type MessageSchema = typeof enUS

  const i18n = createI18n<[MessageSchema], 'en-US' | 'id-ID'>({
    legacy: false, // you must set `false`, to use Composition API
    locale: 'en-US',
    fallbackLocale: 'en-US', // set fallback locale
    messages: {
      'en-US': enUS,
      'id-ID': idID,
    },
  })
  const pinia = createPinia()

  app.use(i18n)
  app.use(pinia)
  app.use(VueQueryPlugin, {
    queryClientConfig: {
      defaultOptions: {
        queries: {
          // gcTime: 1_000 * 60 * 5, // 5 mins. Defaults to 5 mins
          staleTime: 1_000 * 30, // 30 secs. Defaults to 0
          networkMode: 'offlineFirst',
        },
      },
    },
  })
})

export const decorators: Decorator[] = [
  withThemeByClassName({
    themes: {
      light: 'light',
      dark: 'dark',
    },
    defaultTheme: 'light',
  }),
]

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
