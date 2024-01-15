import { screen } from '@testing-library/vue'
import TodosPage from './TodosPage.vue'
import { testWrapper } from '#shared/utils/test.util'

describe('todosPage', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: TodosPage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render content roles correctly', ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: TodosPage })
    const title = screen.getByRole('heading', { level: 1 })

    // ACT & ASSERT
    expect(title).toBeInTheDocument()
  })
})
