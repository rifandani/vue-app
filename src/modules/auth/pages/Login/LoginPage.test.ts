import { testWrapper } from '@shared/utils/test.util'
import { screen } from '@testing-library/vue'
import LoginPage from './LoginPage.vue'

describe('LoginPage', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: LoginPage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render content roles correctly', ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: LoginPage })
    const linkHome: HTMLAnchorElement = screen.getByRole('link', { name: /home/i })
    const linkRegister: HTMLAnchorElement = screen.getByRole('link', { name: /register/i })
    const imgCover: HTMLImageElement = screen.getByRole('img', { name: /cover/i })

    // ASSERT
    expect(linkHome).toBeInTheDocument()
    expect(linkRegister).toBeInTheDocument()
    expect(imgCover).toBeInTheDocument()
  })
})
