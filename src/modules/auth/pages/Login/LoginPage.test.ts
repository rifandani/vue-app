import { screen } from '@testing-library/vue'
import { testWrapper } from '../../../shared/utils/test.util'
import LoginPage from './LoginPage.vue'

describe('LoginPage', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: LoginPage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render content roles correctly', async ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: LoginPage })
    const linkHome: HTMLAnchorElement = screen.getByRole('link', { name: /home/i })
    const linkRegister: HTMLAnchorElement = screen.getByRole('link', { name: /register/i })
    const imgCover: HTMLImageElement = screen.getByRole('img', { name: /cover/i })
    const formLogin: HTMLFormElement = screen.getByRole('form', { name: /login/i })
    const inputUsername: HTMLInputElement = screen.getByRole('textbox', { name: /username/i })
    const inputPassword: HTMLInputElement = screen.getByRole('textbox', { name: /password/i })
    const buttonSubmit: HTMLButtonElement = screen.getByRole('button', { name: /login/i })

    // ASSERT
    expect(linkHome).toBeInTheDocument()
    expect(linkRegister).toBeInTheDocument()
    expect(imgCover).toBeInTheDocument()
    expect(formLogin).toBeInTheDocument()
    expect(inputUsername).toBeInTheDocument()
    expect(inputPassword).toBeInTheDocument()
    expect(buttonSubmit).toBeInTheDocument()
  })
})
