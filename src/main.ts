import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { navigatorDetector } from 'typesafe-i18n/detectors'
import { createApp } from 'vue'
import App from './app/App.vue'
import { router } from './app/router.app'
import { detectLocale } from './i18n/i18n-util'
import { loadLocaleAsync } from './i18n/i18n-util.async'
import { i18nPlugin } from './i18n/i18n-vue'
import './main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(router)
app.use(pinia)
app.use(VueQueryPlugin)

// detect user's preferred locale
const detectedLocale = detectLocale(navigatorDetector)

loadLocaleAsync(detectedLocale).then(() => {
  // activate i18n plugin
  app.use(i18nPlugin, detectedLocale)
  app.mount('#app')
})
