import App from '@app/App.vue'
import { router } from '@app/router.app'
import { detectLocale } from '@i18n/i18n-util'
import { loadLocale } from '@i18n/i18n-util.sync'
import { i18nPlugin } from '@i18n/i18n-vue'
import DarkModeSwitch from '@lib/wc/DarkModeSwitch.ce.vue'
import MyCounter from '@lib/wc/MyCounter.ce.vue'
import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import {
  htmlLangAttributeDetector,
  localStorageDetector,
  navigatorDetector
} from 'typesafe-i18n/detectors'
import { createApp, defineCustomElement } from 'vue'
import './main.css'

const root = document.getElementById('app')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?'
  )
}

// register web components
customElements.define('my-counter', defineCustomElement(MyCounter))
customElements.define('dark-mode-switch', defineCustomElement(DarkModeSwitch))

// detect locale. The detectors order matters.
const detectedLocale = detectLocale(
  navigatorDetector,
  htmlLangAttributeDetector,
  localStorageDetector
)
const pinia = createPinia()
const app = createApp(App)

loadLocale(detectedLocale)

app.use(i18nPlugin, detectedLocale)
app.use(router)
app.use(pinia)
app.use(VueQueryPlugin, {
  queryClientConfig: {
    defaultOptions: {
      queries: {
        staleTime: 1_000 * 30 // 30sec, this is the default in v5
      }
    }
  }
})

// ONLY include browser worker on 'development' env
if (import.meta.env.DEV) {
  void import('./mocks/browser.mock')
    .then(({ worker }) => {
      // insert it into global window object, so we can debug the worker in runtime (e.g Chrome DevTools)
      window.msw = { worker }
      // start browser worker
      return worker.start({ onUnhandledRequest: 'bypass' })
    })
    .then(() => app.mount('#app'))
} else {
  app.mount('#app')
}
