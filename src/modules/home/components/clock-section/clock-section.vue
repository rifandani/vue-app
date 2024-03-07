<script setup lang="ts">
import { shuffle } from '@rifandani/nxact-yutiriti'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import ClockSectionTimer from '#home/components/clock-section/clock-section-timer.vue'
import { todosRoute } from '#todo/routes'
import FadeTransition from '#shared/components/fade-transition.vue'

const { t } = useI18n()
const { push } = useRouter()
const showClock = ref(false)
const time = ref(new Date())
const buttons = ref([
  {
    id: 'sort' as const,
    severity: 'info',
    text: 'home.sortBtn' as const,
  },
  {
    id: 'clock' as const,
    severity: 'help',
    text: 'home.toggleClock' as const,
  },
  {
    id: 'start' as const,
    severity: 'warning',
    text: 'home.getStarted' as const,
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
    class="mt-8 grid grid-cols-1 gap-2 duration-300 sm:grid-cols-3"
  >
    <Button
      v-for="btn in buttons" :key="btn.id" type="button" :label="t(btn.text)" :severity="btn.severity"
      :data-testid="`home-clock-button-${btn.id}`" @click="() => {
        if (btn.id === 'sort') buttons = shuffle(buttons)
        else if (btn.id === 'clock') showClock = !showClock
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
