import { testWrapper } from '@shared/utils/test.util'
import { screen } from '@testing-library/vue'
import NavBar from './NavBar.vue'

describe('NavBar', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: NavBar })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render role contents correctly', async ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: NavBar })
    const link: HTMLAnchorElement = screen.getByRole('link', { name: /logo/i })
    const checkbox: HTMLInputElement = screen.getByRole('checkbox', { name: /drawer/i })

    // ACT & ASSERT
    expect(link).toBeInTheDocument()
    expect(checkbox).toBeInTheDocument()
  })
})
