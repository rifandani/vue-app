<script setup lang="ts">
import { shuffle } from '@rifandani/nxact-yutiriti'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useIntervalFn } from '@vueuse/core'
import { useI18n } from 'vue-i18n'
import ClockSectionTimer from '#home/components/clock-section/clock-section-timer.vue'
import { todosRoute } from '#todo/routes'
import FadeTransition from '#shared/components/fade-transition.vue'
import { Button, type ButtonVariants } from '#shared/components/ui/button'

const { t } = useI18n()
const { push } = useRouter()
const showClock = ref(false)
const time = ref(new Date())
const buttons = ref([
  {
    id: 'sort' as const,
    variant: 'default' as ButtonVariants['variant'],
    text: 'home.sortBtn' as const,
  },
  {
    id: 'clock' as const,
    variant: 'secondary' as ButtonVariants['variant'],
    text: 'home.toggleClock' as const,
  },
  {
    id: 'start' as const,
    variant: 'outline' as ButtonVariants['variant'],
    text: 'home.getStarted' as const,
  },
])

// recalculate `time` every second
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

  <TransitionGroup name="list" tag="ul" class="mt-8 grid grid-cols-1 gap-2 duration-300 sm:grid-cols-3">
    <Button
      v-for="btn in buttons" :key="btn.id" type="button" :variant="btn.variant"
      :data-testid="`home-clock-button-${btn.id}`" @click="async () => {
        if (btn.id === 'sort') buttons = shuffle(buttons)
        else if (btn.id === 'clock') showClock = !showClock
        else await push(todosRoute.path)
      }"
    >
      {{ t(btn.text) }}
    </Button>
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
