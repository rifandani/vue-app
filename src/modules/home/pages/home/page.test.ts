import { screen } from '@testing-library/vue'
import HomePage from '#home/pages/home/page.vue'
import { testWrapper } from '#shared/utils/test'

describe('<HomePage />', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper<typeof HomePage>({ component: HomePage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render contents correctly', ({ wrapper }) => {
    // ARRANGE
    wrapper<typeof HomePage>({ component: HomePage })
    const heading: HTMLHeadingElement = screen.getByRole('heading', { level: 1 })

    // ACT & ASSERT
    expect(heading).toBeInTheDocument()
  })
})
