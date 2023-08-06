import { screen } from '@testing-library/vue'
import { testWrapper } from '../../../shared/utils/test.util'
import TodosPage from './TodosPage.vue'

describe('TodosPage', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: TodosPage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render content roles correctly', ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: TodosPage })
    const title = screen.getByRole('heading', { name: /todo list/i })

    // ASSERT
    expect(title).toBeInTheDocument()
  })
})
