import { screen } from '@testing-library/vue'
import TodoPage from './TodoPage.vue'
import { testWrapper } from '#shared/utils/test.util'

describe('todoPage', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: TodoPage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render role contents correctly', ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: TodoPage })
    const link: HTMLAnchorElement = screen.getByRole('link', { name: /go-back/i })
    const title: HTMLHeadingElement = screen.getByRole('heading', { name: /detail/i })

    // ACT & ASSERT
    expect(link).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })
})
