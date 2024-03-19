import { screen } from '@testing-library/vue'
import TodosPage from '#todo/pages/todos/page.vue'
import { testWrapper } from '#shared/utils/test'

describe('<TodosPage />', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper<typeof TodosPage>({ component: TodosPage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render content roles correctly', ({ wrapper }) => {
    // ARRANGE
    wrapper<typeof TodosPage>({ component: TodosPage })
    const title = screen.getByRole('heading', { level: 1 })

    // ACT & ASSERT
    expect(title).toBeInTheDocument()
  })
})
