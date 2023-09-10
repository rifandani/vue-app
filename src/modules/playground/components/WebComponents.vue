<script setup lang="ts">
import {
  myCounterEventDecrement,
  myCounterEventIncrement,
  type MyCounterEventDetail
} from '@lib/wc/MyCounter.constant'
import { onMounted, onUnmounted, ref } from 'vue'

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
    class="card flex w-full flex-col items-center space-y-3 rounded-lg border p-5 shadow-lg"
  >
    <button class="btn btn-info btn-xs" @click="handleClickTambah">Tambah</button>

    <my-counter :initial-count="initialCount"></my-counter>

    <dark-mode-switch></dark-mode-switch>
  </section>
</template>
