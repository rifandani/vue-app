<script setup lang="ts">
import { ref, watchEffect } from 'vue'
import {
  type MyCounterProps,
  myCounterEventDecrement,
  myCounterEventIncrement,
} from './my-counter.constant'

const props = defineProps<MyCounterProps>()

const count = ref('')
// const store = useCounterStore()

// #region HANDLERS
function onDecrement(ev: Event) {
  const target = ev.currentTarget as HTMLButtonElement
  const newCount = (Number(count.value) - 1).toString()

  count.value = newCount
  target.dispatchEvent(
    new CustomEvent(myCounterEventDecrement, {
      bubbles: true,
      composed: true, // to cross the Shadow DOM boundaries
      detail: { count: newCount },
    }),
  )
}

function onIncrement(ev: Event) {
  const target = ev.currentTarget as HTMLButtonElement
  const newCount = (Number(count.value) + 1).toString()

  count.value = newCount
  target.dispatchEvent(
    new CustomEvent(myCounterEventIncrement, {
      bubbles: true,
      composed: true, // to cross the Shadow DOM boundaries
      detail: { count: newCount },
    }),
  )
}
// #endregion

// sync the props to `count` state
watchEffect(() => {
  count.value = props.initialCount
})
</script>

<template>
  <div part="containerPart" class="container">
    <button part="btnPart" class="btn" @click="onDecrement">
      Decrement
    </button>
    <p part="countPart" class="text">
      {{ count }}
    </p>
    <button part="btnPart" class="btn" @click="onIncrement">
      Increment
    </button>
  </div>
</template>

<!-- as of vue@3.3.4, there is no way to tell it to disable shadow dom -->
<style>
:host {
  --bg-normal: #fafaf9;
  --bg-hover: #f5f5f4;
  --font-size: 16px;
}

.container {
  display: flex;
  align-items: center;
}

.text {
  margin: 0 1rem;
  font-size: var(--font-size);
  color: var(--primary-color);
}

.btn {
  padding: 5px;
  border-radius: 10px;
  background-color: var(--bg-normal);
}

.btn:hover {
  cursor: pointer;
  background-color: var(--bg-hover);
}
</style>
