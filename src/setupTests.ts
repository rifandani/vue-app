import matchers from '@testing-library/jest-dom/matchers'
import { server } from './mocks/http/server.http'
import './mocks/module.mock'

expect.extend(matchers)

// Establish API mocking before all tests with MSW
beforeAll(async () => {
  server.listen({
    onUnhandledRequest: 'warn'
  })
})

// Reset any request handlers that we may add during the tests, so they don't affect other tests.
afterEach(() => {
  server.resetHandlers()
  // vi.resetAllMocks();
  // vi.restoreAllMocks();
  // vi.clearAllMocks();
})

// Clean up after the tests are finished.
afterAll(() => server.close())
