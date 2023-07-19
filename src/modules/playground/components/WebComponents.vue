<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import {
  myCounterEventDecrement,
  myCounterEventIncrement,
  type MyCounterEventDetail
} from '../../../lib/wc/MyCounter.constant'

const sectionRef = ref<HTMLDivElement>()
const initialCount = ref('10')
// const store = useCounterStore()

const handleClickTambah = () => {
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
    class="card flex w-full flex-col items-center space-y-3 rounded-lg border bg-secondary p-5 text-secondary-content shadow-lg"
  >
    <button class="btn-info btn-xs btn" @click="handleClickTambah">Tambah</button>

    <my-counter :initial-count="initialCount"></my-counter>

    <dark-mode-switch></dark-mode-switch>
  </section>
</template>
