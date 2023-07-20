import type { AnyFn } from '@vueuse/core'
import { createApp } from 'vue'

/**
 * A composable that relies on lifecycle hooks or Provide / Inject needs to be wrapped in a host component to be tested
 *
 * @example
 *
 * test('useFoo', () => {
 *   const [result, app] = withSetup(() => useFoo(123))
 *
 *   // mock provide for testing injections
 *   app.provide(...)
 *
 *   // run assertions
 *   expect(result.foo.value).toBe(1)
 *
 *   // trigger onUnmounted hook if needed
 *   app.unmount()
 * })
 */
export function withSetup(composable: AnyFn) {
  let result
  const app = createApp({
    setup() {
      result = composable()
      // suppress missing template warning
      return () => {}
    }
  })

  app.mount(document.createElement('div'))

  // return the result and the app instance for testing provide / unmount
  return [result, app]
}
