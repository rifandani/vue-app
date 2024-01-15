<script setup lang="ts">
import { useColorMode } from '@vueuse/core'
import { usePrimeVue } from 'primevue/config'
import { computed, watchEffect } from 'vue'

const mode = useColorMode()
const PrimeVue = usePrimeVue()
const currentColorMode = computed(() =>
  mode.store.value === 'auto' ? mode.system.value : mode.store.value,
)

watchEffect(() => {
  const currentTheme
    = currentColorMode.value === 'light'
      ? 'lara-dark-teal'
      : currentColorMode.value === 'dark'
        ? 'lara-light-teal'
        : currentColorMode.value === 'light'
          ? 'lara-light-teal'
          : 'lara-dark-teal'
  const newTheme
    = currentColorMode.value === 'light'
      ? 'lara-light-teal'
      : currentColorMode.value === 'dark'
        ? 'lara-dark-teal'
        : currentColorMode.value === 'light'
          ? 'lara-dark-teal'
          : 'lara-light-teal'

  PrimeVue.changeTheme(currentTheme, newTheme, 'theme-link')
})
</script>

<template>
  <slot />
</template>
