<script setup lang="ts">
import type { Translation } from '@i18n/i18n-types'
import { loadLocale } from '@i18n/i18n-util.sync'
import { typesafeI18n } from '@i18n/i18n-vue'
import { shuffle } from '@rifandani/nxact-yutiriti'
import { FadeTransition } from '@shared/components/atoms'
import { todosRoute } from '@todo/routes/todo.route'
import { onUnmounted, ref, watchEffect } from 'vue'
import { useRouter } from 'vue-router'

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
    id: 'sort' as const,
    class: 'btn-neutral btn',
    text: 'sortBtn' as keyof Translation['home']
  },
  {
    id: 'clock' as const,
    class: 'btn-active btn',
    text: 'toggleClock' as keyof Translation['home']
  },
  {
    id: 'language' as const,
    class: 'btn-accent btn',
    text: 'changeLang' as keyof Translation['home']
  },
  {
    id: 'start' as const,
    class: 'btn-secondary btn',
    text: 'getStarted' as keyof Translation['home']
  }
])

const onClickMapper = (btnId: 'sort' | 'clock' | 'language' | 'start') => {
  const mapper: Record<typeof btnId, () => void> = {
    sort: () => (buttons.value = shuffle(buttons.value)),
    clock: () => (showClock.value = !showClock.value),
    language: () => {
      const newLocale = locale.value === 'en' ? 'id' : 'en'
      // update dictionaries and update formatters
      loadLocale(newLocale)
      // change locale store
      setLocale(newLocale)
    },
    start: () => void push(todosRoute.path)
  }

  mapper[btnId]()
}

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
  <FadeTransition>
    <div v-if="showClock" data-testid="home-clock-show" class="stats mt-8 bg-base-200 shadow">
      <div class="stat">
        <div class="stat-title">{{ LL.home.clock() }}:</div>
        <div class="stat-value">{{ hours }} : {{ minutes }} : {{ seconds }} {{ '' }}</div>
        <div class="stat-desc">{{ LL.home.clickToggleClock() }}</div>
      </div>
    </div>
  </FadeTransition>

  <TransitionGroup
    name="list"
    tag="ul"
    class="mt-8 grid grid-cols-1 gap-2 duration-300 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
  >
    <button
      v-for="btn in buttons"
      :key="btn.id"
      type="button"
      :data-testid="`home-clock-button-${btn.id}`"
      :class="btn.class"
      @click="() => onClickMapper(btn.id)"
    >
      {{ LL.home[btn.text]() }}
    </button>
  </TransitionGroup>
</template>

<style scoped>
.list-move, /* apply transition to moving elements */
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
