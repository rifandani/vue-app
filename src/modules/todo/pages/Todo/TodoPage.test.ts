import { screen } from '@testing-library/vue'
import { testWrapper } from '../../../shared/utils/test.util'
import TodoPage from './TodoPage.vue'

describe('TodoPage', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: TodoPage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render role contents correctly', ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: TodoPage })
    const title: HTMLHeadingElement = screen.getByRole('heading', { name: /detail/i })

    // ASSERT
    expect(title).toBeInTheDocument()
  })
})
