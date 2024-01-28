<script setup lang="ts">
import { shuffle } from '@rifandani/nxact-yutiriti'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
import ClockSectionTimer from '#home/components/clock-section/clock-section-timer.vue'
import type { Translation } from '#i18n/i18n-types'
import { loadLocale } from '#i18n/i18n-util.sync'
import { typesafeI18n } from '#i18n/i18n-vue'
import { todosRoute } from '#todo/routes'
import FadeTransition from '#shared/components/fade-transition.vue'

const { push } = useRouter()
const { LL, locale, setLocale } = typesafeI18n()
const showClock = ref(false)
const time = ref(new Date())
const buttons = ref([
  {
    id: 'sort' as const,
    severity: 'info',
    text: 'sortBtn' as keyof Translation['home'],
  },
  {
    id: 'clock' as const,
    severity: 'help',
    text: 'toggleClock' as keyof Translation['home'],
  },
  {
    id: 'language' as const,
    severity: 'secondary',
    text: 'changeLang' as keyof Translation['home'],
  },
  {
    id: 'start' as const,
    severity: 'warning',
    text: 'getStarted' as keyof Translation['home'],
  },
])

// recalculate `seconds` every 1_000 ms
useIntervalFn(
  () => {
    if (showClock.value)
      time.value = new Date()
  },
  1_000,
  { immediate: true },
)
</script>

<template>
  <FadeTransition>
    <ClockSectionTimer
      v-if="showClock" :seconds="time.getSeconds()" :minutes="time.getMinutes()"
      :hours="time.getHours()"
    />
  </FadeTransition>

  <TransitionGroup
    name="list" tag="ul"
    class="mt-8 grid grid-cols-1 gap-2 p-0 duration-300 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <Button
      v-for="btn in buttons" :key="btn.id" type="button" :label="LL.home[btn.text]()" :severity="btn.severity"
      :data-testid="`home-clock-button-${btn.id}`" @click="() => {
        if (btn.id === 'sort') buttons = shuffle(buttons)
        else if (btn.id === 'clock') showClock = !showClock
        else if (btn.id === 'language') {
          const newLocale = locale === 'en' ? 'id' : 'en'
          // update dictionaries and update formatters
          loadLocale(newLocale)
          // change locale store
          setLocale(newLocale)
        }
        else void push(todosRoute.path)
      }"
    />
  </TransitionGroup>
</template>

<style scoped>
.list-move,
/* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* ensure leaving items are taken out of layout flow so that moving animations can be calculated correctly. */
.list-leave-active {
  position: absolute;
}
</style>
