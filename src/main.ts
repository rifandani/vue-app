import { VueQueryPlugin } from '@tanstack/vue-query'
import { createPinia } from 'pinia'
import { createApp } from 'vue'
import App from './app/App.vue'
import { router } from './app/router.app'
import { i18nPlugin } from './i18n/i18n-vue'
import './main.css'

const pinia = createPinia()
const app = createApp(App)

app.use(i18nPlugin, 'en')
app.use(pinia)
app.use(router)
app.use(VueQueryPlugin)
app.mount('#app')
