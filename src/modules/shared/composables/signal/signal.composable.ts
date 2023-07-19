import { shallowRef, triggerRef } from 'vue'

/**
 * Angular's new signal reactivity primitive.
 * dirty-checking
 */
export const signal = <T>(initialValue: T) => {
  const r = shallowRef(initialValue)
  const s = () => r.value

  s.set = (value: T) => {
    r.value = value
  }
  s.update = (updater: (v: T) => T) => {
    r.value = updater(r.value)
  }
  s.mutate = (mutator: (v: T) => void) => {
    mutator(r.value)
    triggerRef(r)
  }

  return s
}
