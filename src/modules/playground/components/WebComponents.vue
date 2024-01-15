<script setup lang="ts">
import {
  type MyCounterEventDetail,
  myCounterEventDecrement,
  myCounterEventIncrement,
} from '@lib/wc/MyCounter.constant'
import Button from 'primevue/button'
import { onMounted, onUnmounted, ref } from 'vue'

const sectionRef = ref<HTMLDivElement>()
const initialCount = ref('10')
// const store = useCounterStore()

function handleClickTambah() {
  initialCount.value = (Number(initialCount.value) + 1).toString()
}

const onDecrement: EventListenerOrEventListenerObject = (ev) => {
  const customEv = ev as CustomEvent<MyCounterEventDetail>
  initialCount.value = customEv.detail.count
}
const onIncrement: EventListenerOrEventListenerObject = (ev) => {
  const customEv = ev as CustomEvent<MyCounterEventDetail>
  initialCount.value = customEv.detail.count
}

onMounted(() => {
  sectionRef.value?.addEventListener(myCounterEventDecrement, onDecrement)
  sectionRef.value?.addEventListener(myCounterEventIncrement, onIncrement)
})

onUnmounted(() => {
  sectionRef.value?.removeEventListener(myCounterEventDecrement, onDecrement)
  sectionRef.value?.removeEventListener(myCounterEventIncrement, onIncrement)
})
</script>

<template>
  <section
    ref="sectionRef"
    class="flex w-full flex-col items-center gap-3 rounded-md p-5 shadow-md"
  >
    <h4>Web Components</h4>

    <Button label="Increment from parent" @click="handleClickTambah" />

    <my-counter :initial-count="initialCount" />

    <dark-mode-switch />
  </section>
</template>
