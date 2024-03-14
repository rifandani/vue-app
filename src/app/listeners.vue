<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRegisterSW } from 'virtual:pwa-register/vue'
import { watch } from 'vue'
import { toast } from 'vue-sonner'

// replaced dynamically
// const buildDate = '__DATE__' as '__DATE__' | Omit<string, '__DATE__'>
const reloadSW = '__RELOAD_SW__' as '__RELOAD_SW__' | 'true'

const { t } = useI18n()
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
        console.info('🔵 Updating Service Worker registration...')
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

// listens to reload prompt SW
watch([offlineReady, needRefresh], () => {
  if (offlineReady.value || needRefresh.value) {
    toast(offlineReady.value
      ? t('common.appReady')
      : t('common.newContentAvailable'), {
      closeButton: true,
      duration: 60 * 1_000,
      onDismiss: () => {
        offlineReady.value = false
        needRefresh.value = false
      },
      ...(needRefresh.value && {
        action: {
          label: t('common.reload'),
          onClick: () => updateServiceWorker(),
        },
      }),
    })
  }
})
</script>

<template>
  <slot />
</template>
