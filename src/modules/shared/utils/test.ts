import { VueQueryPlugin } from '@tanstack/vue-query'
import { type RenderResult, render } from '@testing-library/vue'
import type { AnyFn } from '@vueuse/core'
import { type TestAPI, test } from 'vitest'
import { type ComponentInstance, createApp } from 'vue'
import { createI18n } from 'vue-i18n'
import enUS from '#i18n/en-US.json'
import idID from '#i18n/id-ID.json'

export interface WrapperParams<T> {
  component: any
  props?: ComponentInstance<T>['$props']
  stubs?: string[]
}

// Type-define 'en-US' as the master schema for the resource
type MessageSchema = typeof enUS

const i18n = createI18n<[MessageSchema], 'en-US' | 'id-ID'>({
  legacy: false, // you must set `false`, to use Composition API
  locale: 'en-US',
  fallbackLocale: 'en-US', // set fallback locale
  messages: {
    'en-US': enUS,
    'id-ID': idID,
  },
})

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
export function renderWrapper<T>() {
  return ({ component, stubs, props }: WrapperParams<T>) =>
    render(component, {
      global: {
        stubs: (stubs ?? []).concat(['router-link', 'RouterLink']),
        plugins: [
          [i18n],
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
  wrapper: <T>(props: WrapperParams<T>) => RenderResult
}> = test.extend<{ wrapper: <T>(props: WrapperParams<T>) => RenderResult }>({
  wrapper: async ({ task: _task }, use) => {
    // setup the fixture before each test function
    const view = renderWrapper()

    // use the fixture value
    await use(view)

    // cleanup the fixture after each test function here...
  },
})
