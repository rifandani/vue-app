import { VueQueryPlugin } from '@tanstack/vue-query'
import { type RenderResult, render } from '@testing-library/vue'
import type { AnyFn } from '@vueuse/core'
import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import { localStorageDetector } from 'typesafe-i18n/detectors'
import { type TestAPI, test } from 'vitest'
import { createApp } from 'vue'
import { i18nPlugin } from '#i18n/i18n-vue'
import { loadLocaleAsync } from '#i18n/i18n-util.async'
import { detectLocale } from '#i18n/i18n-util'
import type { Locales } from '#i18n/i18n-types'

export interface RenderWrapperParams {
  locales: Locales
}
export interface WrapperParams {
  component: any
  stubs?: string[]
  props?: any
}

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
    },
  })

  app.mount(document.createElement('div'))

  // return the result and the app instance for testing provide / unmount
  return [result, app]
}

/**
 * render vue SFC with global plugins, like i18n
 *
 * @example
 *
 * const detectedLocale = detectLocale(navigatorDetector)
 * const wrapper = renderWrapper({ locales: detectedLocale })
 */
export function renderWrapper({ locales }: RenderWrapperParams) {
  return ({ component, stubs, props }: WrapperParams) =>
    render(component, {
      global: {
        stubs: (stubs ?? []).concat(['router-link', 'RouterLink']),
        plugins: [
          [i18nPlugin, locales],
          [
            VueQueryPlugin,
            {
              queryClientConfig: {
                defaultOptions: {
                  queries: {
                    retry: false,
                    gcTime: 0,
                  },
                },
              },
            },
          ],
          [PrimeVue, { ripple: true }],
          [ToastService],
        ],
      },
      props,
    })
}

/**
 * For i18n plugin to work properly, we need to wrap test component inside the `renderWrapper`.
 * And then pass `wrapper` to the test context.
 * We can also do it in the `beforeAll` by mutating it's context.
 */
export const testWrapper: TestAPI<{
  wrapper: (props: WrapperParams) => RenderResult
}> = test.extend<{ wrapper: (props: WrapperParams) => RenderResult }>({
  wrapper: async (_, use) => {
    // setup the fixture before each test function
    const locales = detectLocale(localStorageDetector) // detect user's preferred locale
    const view = renderWrapper({ locales })

    await loadLocaleAsync(locales)

    // use the fixture value
    await use(view)

    // cleanup the fixture after each test function here...
  },
})
