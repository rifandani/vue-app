<script setup lang="ts">
import Button from 'primevue/button'
import Message from 'primevue/message'
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
  <Teleport to="body">
    <aside id="reload-prompt-sw">
      <Message
        v-if="offlineReady || needRefresh" severity="info"
        :pt="{ root: 'absolute mt-0 mb-4 mr-4 bottom-0 right-0', wrapper: 'p-4', text: 'min-w-[20rem] max-w-[20rem] overflow-hidden pl-4' }"
        @close="onClose"
      >
        <p class="line-clamp-3 whitespace-pre-wrap break-words">
          {{ offlineReady
            ? 'App ready to work offline'
            : 'New content available, click on reload button to update' }}
        </p>

        <Button
          v-if="needRefresh" severity="secondary" size="small" outlined label="Reload"
          @click="() => updateServiceWorker()"
        />
      </Message>

      <span className="hidden">{{ buildDate }}</span>
    </aside>
  </Teleport>
</template>
