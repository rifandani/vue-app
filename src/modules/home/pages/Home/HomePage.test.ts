import { screen } from '@testing-library/vue'
import HomePage from './HomePage.vue'
import { testWrapper } from '#shared/utils/test.util'

describe('homePage', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: HomePage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render contents correctly', ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: HomePage })
    const heading: HTMLHeadingElement = screen.getByRole('heading', { level: 1 })

    // ACT & ASSERT
    expect(heading).toBeInTheDocument()
  })
})
