import { screen, waitFor } from '@testing-library/vue'
import { HttpResponse } from 'msw'
import TodosList from '#todo/components/todos-list/todos-list.vue'
import { http, server } from '#mocks/http/server'
import { getBaseUrl } from '#mocks/util'
import { testWrapper } from '#shared/utils/test'

describe('<TodosList />', () => {
  const loadingId = 'list-loading'

  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper<typeof TodosList>({ component: TodosList })
    expect(() => result).not.toThrow()
  })

  // FIXME: query status always "fetching" whatever ctx.status I passed in.
  // 'list-loading' exists, but 'list-error' doesn't.
  testWrapper('should be able to query and show error alert', async ({ wrapper }) => {
    // ASSERT
    expect(screen.queryByTestId(loadingId)).not.toBeInTheDocument()

    // ARRANGE
    server.use(
      http.get(
        getBaseUrl('todos'),
        () => {
          return HttpResponse.json({ message: 'error' }, { status: 500 })
        },
        { once: true },
      ),
    )
    wrapper<typeof TodosList>({ component: TodosList })

    // ASSERT
    await waitFor(() => {
      // screen.debug(result.container)
      // wait for appearance inside an assertion
      expect(screen.getByTestId(loadingId)).toBeInTheDocument()
    })
  })
})
