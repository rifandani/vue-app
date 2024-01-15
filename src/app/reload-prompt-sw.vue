<script setup lang="ts">
import { useRegisterSW } from 'virtual:pwa-register/vue'

// replaced dynamically
const buildDate = '__DATE__' as '__DATE__' | Omit<string, '__DATE__'>
// replaced dyanmicaly
const reloadSW = '__RELOAD_SW__' as '__RELOAD_SW__' | 'true'

const {
  offlineReady,
  needRefresh,
  updateServiceWorker,
} = useRegisterSW({
  // immediate: true,
  onRegisteredSW(_swUrl, registration) {
    // in `vite.config.ts`, the `reloadSW` could be `'true'` if `process.env.RELOAD_SW === 'true'`
    if (reloadSW === 'true' && registration) {
      setInterval(() => {
        // eslint-disable-next-line no-console
        console.log('🔵 Updating Service Worker registration...')
        void registration.update()
      }, 10_000 /* 10s for testing purposes */)
    }
    else {
      // eslint-disable-next-line no-console
      console.log(`✅ Service Worker registered`, registration)
    }
  },
  onRegisterError(error) {
    console.error('🛑 Service Worker registration error', error)
  },
})

function onClose() {
  offlineReady.value = false
  needRefresh.value = false
}
</script>

<template>
  <aside id="ReloadPromptSW" className="toast">
    <div
      v-if="offlineReady || needRefresh"
      className="alert relative block min-w-[20rem] max-w-[20rem] overflow-hidden p-3 shadow-lg"
    >
      <h3 className="line-clamp-3 whitespace-pre-wrap break-words pb-3">
        {{ offlineReady
          ? 'App ready to work offline'
          : 'New content available, click on reload button to update' }}
      </h3>

      <section className="flex justify-between">
        <button
          type="button" className="btn-outlined btn btn-sm w-1/2"
          @click="onClose"
        >
          Close
        </button>

        <button
          v-if="needRefresh" type="button" className="btn btn-primary btn-sm w-1/2"
          @click="() => updateServiceWorker()"
        >
          Reload
        </button>
      </section>
    </div>

    <span className="hidden">{{ buildDate }}</span>
  </aside>
</template>
