import { screen } from '@testing-library/vue'
import TodoPage from '#todo/pages/todo/page.vue'
import { testWrapper } from '#shared/utils/test'

describe('<TodoPage />', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper<typeof TodoPage>({ component: TodoPage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render role contents correctly', ({ wrapper }) => {
    // ARRANGE
    wrapper<typeof TodoPage>({ component: TodoPage })
    const breadcrumb = screen.getByRole('navigation', { name: 'breadcrumb' })
    const title: HTMLHeadingElement = screen.getByRole('heading', { name: /detail/i })

    // ACT & ASSERT
    expect(breadcrumb).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })
})
