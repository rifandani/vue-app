import { render } from '@testing-library/vue'
import type { AnyFn } from '@vueuse/core'
import { createApp } from 'vue'
import type { Locales } from '../../../i18n/i18n-types'
import { i18nPlugin } from '../../../i18n/i18n-vue'

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
export function composableWrapper(composable: AnyFn) {
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

/**
 * render vue SFC with global plugins, like i18n
 *
 * @param Component any vue SFC
 *
 * @example
 *
 * const detectedLocale = detectLocale(navigatorDetector)
 * const wrapper = renderWrapper(detectedLocale)
 */
export function renderWrapper(detectedLocale: Locales) {
  return (Component: any) =>
    render(Component, {
      global: {
        plugins: [[i18nPlugin, detectedLocale]]
      }
    })
}
