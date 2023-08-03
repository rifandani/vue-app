import { vi } from 'vitest'
import router from 'vue-router'

vi.mock('vue-router', async () => {
  const actual = await vi.importActual<typeof router>('vue-router')

  return {
    ...actual,
    default: vi.fn(() => ({})),
    useRoute: vi.fn(() => ({
      query: { limit: '10' }
    })),
    useRouter: vi.fn(() => ({
      push: vi.fn(),
      replace: vi.fn(),
      back: vi.fn(),
      forward: vi.fn(),
      go: vi.fn()
    }))
  }
})

vi.mock('@vee-validate', async () => {
  const actual = await vi.importActual<typeof router>('@vee-validate')

  return {
    ...actual,
    default: vi.fn(() => ({}))
  }
})

vi.mock('@vee-validate/zod', async () => {
  const actual = await vi.importActual<typeof router>('@vee-validate/zod')

  return {
    ...actual,
    default: vi.fn(() => ({}))
  }
})

vi.mock('typesafe-i18n', () => ({
  LL: vi.fn()
}))

// mock ResizeObserver
const resizeObserverMock = vi.fn(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn()
}))
vi.stubGlobal('ResizeObserver', resizeObserverMock)

// mock window matchMedia
window.matchMedia = function matchMedia(query) {
  return {
    media: query,
    matches: false,
    onchange: null,
    addListener: vi.fn(), // Deprecated
    removeListener: vi.fn(), // Deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn()
  }
}

// implementation of window.resizeTo for dispatching event
global.resizeTo = function resizeTo(width, height) {
  Object.assign(this, {
    innerWidth: width,
    innerHeight: height,
    outerWidth: width,
    outerHeight: height
  }).dispatchEvent(new this.Event('resize'))
}
