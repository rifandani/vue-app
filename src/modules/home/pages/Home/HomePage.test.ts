import { testWrapper } from '@shared/utils/test.util'
import { screen } from '@testing-library/vue'
import HomePage from './HomePage.vue'

describe('HomePage', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: HomePage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render contents correctly', ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: HomePage })
    const heading: HTMLHeadingElement = screen.getByRole('heading', { name: /vue app/i })

    // ACT & ASSERT
    expect(heading).toBeInTheDocument()
  })
})
