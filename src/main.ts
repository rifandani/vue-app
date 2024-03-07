import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import AnimateOnScroll from 'primevue/animateonscroll'
import PrimeVue from 'primevue/config'
import Ripple from 'primevue/ripple'
import StyleClass from 'primevue/styleclass'
import ToastService from 'primevue/toastservice'
import { createApp, defineCustomElement } from 'vue'
import { createI18n } from 'vue-i18n'
import MyCounter from '#lib/wc/my-counter.ce.vue'
import DarkModeSwitch from '#lib/wc/dark-mode-switch.ce.vue'
import { router } from '#app/router'
import App from '#app/entry.vue'
import enUS from '#i18n/en-US.json'
import idID from '#i18n/id-ID.json'
import './main.css'

const root = document.getElementById('app')

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
  throw new Error(
    'Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got mispelled?',
  )
}

// register web components
customElements.define('my-counter', defineCustomElement(MyCounter))
customElements.define('dark-mode-switch', defineCustomElement(DarkModeSwitch))

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
const app = createApp(App)

app.use(i18n)
app.use(router)
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
// primevue
app.use(PrimeVue, { ripple: true })
app.use(ToastService)
app.directive('animateonscroll', AnimateOnScroll)
app.directive('styleclass', StyleClass)
app.directive('ripple', Ripple)

// ONLY include browser worker on 'development' env
if (import.meta.env.DEV) {
  void import('./mocks/browser')
    .then(({ worker }) => {
      // insert it into global window object, so we can debug the worker in runtime (e.g Chrome DevTools)
      window.msw = { worker }
      // start browser worker
      return worker.start({ onUnhandledRequest: 'bypass' })
    })
    .then(() => app.mount('#app'))
}
else {
  app.mount('#app')
}
