<script setup lang="ts">
import { shuffle } from '@rifandani/nxact-yutiriti'
import { onUnmounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'
import { loadLocale } from '../../../../i18n/i18n-util.sync'
import { typesafeI18n } from '../../../../i18n/i18n-vue'

//#region VALUES
const { LL, locale, setLocale } = typesafeI18n()
const { push } = useRouter()

const showClock = ref(false)
const timeoutId = ref<ReturnType<typeof setInterval>>()
const seconds = ref(0)
const minutes = ref(0)
const hours = ref(0)
const buttons = ref([
  {
    id: 'sort',
    class: 'btn-neutral btn',
    onClick: () => {},
    text: LL.value.home.sortBtn()
  },
  {
    id: 'clock',
    class: 'btn-active btn',
    onClick: () => (showClock.value = !showClock.value),
    text: LL.value.home.toggleClock()
  },
  {
    id: 'language',
    class: 'btn-accent btn',
    onClick: () => {
      const newLocale = locale.value === 'en' ? 'id' : 'en'
      // update dictionaries and update formatters
      loadLocale(newLocale)
      // change locale store
      setLocale(newLocale)
    },
    text: LL.value.home.changeLang()
  },
  {
    id: 'start',
    class: 'btn-secondary btn',
    onClick: () => push('/todos'),
    text: LL.value.home.getStarted()
  }
])

watchEffect(() => {
  // recalculate `seconds` every 100 ms
  {
    if (showClock.value && !timeoutId.value) {
      timeoutId.value = setInterval(() => {
        seconds.value = +(seconds.value + 0.1).toFixed(2)
      }, 100)
    }
    if (!showClock.value && timeoutId.value) {
      seconds.value = 0

      // NOTE: it's important to clear the timeout and set `timeoutId` back to undefined
      clearTimeout(timeoutId.value)
      timeoutId.value = undefined
    }
  }
})

watchEffect(() => {
  // recalculate `minutes` when `seconds` changes
  minutes.value =
    seconds.value > 0 ? (seconds.value % 2 === 0 ? minutes.value + 1 : minutes.value) : 0
})

watchEffect(() => {
  // recalculate `hours` when `minutes` changes
  hours.value = minutes.value > 0 ? (minutes.value % 2 === 0 ? hours.value + 1 : hours.value) : 0
})

//#endregion

onUnmounted(() => clearTimeout(timeoutId.value))
</script>

<template>
  <div v-if="showClock" data-testid="show-clock" class="stats mt-8 shadow">
    <div class="stat">
      <div class="stat-title">{{ LL.home.clock() }}:</div>
      <div class="stat-value">{{ hours }} : {{ minutes }} : {{ seconds }} {{ '' }}</div>
      <div class="stat-desc">{{ LL.home.clickToggleClock() }}</div>
    </div>
  </div>

  <div
    class="mt-8 grid grid-cols-1 gap-2 duration-300 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <button
      v-for="btn in buttons"
      :key="btn.id"
      :data-testid="btn.id"
      :class="btn.class"
      @click="btn.id === 'sort' ? () => (buttons = shuffle(buttons)) : btn.onClick"
    >
      {{ btn.text }}
    </button>
  </div>
</template>
