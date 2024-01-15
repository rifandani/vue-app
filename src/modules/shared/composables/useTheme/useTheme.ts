import { type BasicColorSchema, useColorMode } from '@vueuse/core'
import { usePrimeVue } from 'primevue/config'
import { computed } from 'vue'

export function useTheme() {
  const PrimeVue = usePrimeVue()
  const mode = useColorMode()
  const currentColorMode = computed(() =>
    mode.store.value === 'auto' ? mode.system.value : mode.store.value,
  )

  const changeTheme = (colorSchema: BasicColorSchema) => {
    const currentTheme
      = colorSchema === 'light'
        ? 'lara-dark-teal'
        : colorSchema === 'dark'
          ? 'lara-light-teal'
          : currentColorMode.value === 'light'
            ? 'lara-light-teal'
            : 'lara-dark-teal'
    const newTheme
      = colorSchema === 'light'
        ? 'lara-light-teal'
        : colorSchema === 'dark'
          ? 'lara-dark-teal'
          : currentColorMode.value === 'light'
            ? 'lara-dark-teal'
            : 'lara-light-teal'

    mode.value = colorSchema
    PrimeVue.changeTheme(currentTheme, newTheme, 'theme-link')
  }

  return {
    mode,
    currentColorMode,
    changeTheme,
  }
}
