import { shallowRef, triggerRef } from 'vue'

/**
 * Solid's createSignal() API design emphasizes read / write segregation.
 * Signals are exposed as a read-only getter and a separate setter
 */
export const createSignal = <T>(value: T, options?: { equals: boolean }) => {
  const r = shallowRef(value)

  const get = () => r.value

  const set = (v: T) => {
    r.value = typeof v === 'function' ? v(r.value) : v
    if (!options?.equals) triggerRef(r)
  }

  return [get, set]
}
