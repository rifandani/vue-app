import { acceptHMRUpdate, defineStore } from 'pinia'
import { ref } from 'vue'

export const useCounterStore = defineStore('counter', () => {
  const counter = ref('0')

  const increment = () => {
    counter.value = (Number(counter.value) + 1).toString()
  }
  const decrement = () => {
    counter.value = (Number(counter.value) - 1).toString()
  }

  return { counter, increment, decrement }
})

if (import.meta.hot) {
  import.meta.hot.accept(acceptHMRUpdate(useCounterStore, import.meta.hot))
}
