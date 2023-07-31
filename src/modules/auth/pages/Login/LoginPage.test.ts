import { fireEvent, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import { testWrapper } from '../../../shared/utils/test.util'
import LoginPage from './LoginPage.vue'

describe('LoginPage', () => {
  const validUsernameValue = 'kminchelle'
  const validPasswordValue = '0lelplR'
  const mockSubmitFn = vi.fn()

  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper(LoginPage)
    expect(() => result).not.toThrow()
  })

  testWrapper('should render content roles correctly', async ({ wrapper }) => {
    // ARRANGE
    wrapper(LoginPage)
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

  testWrapper(
    'should be able to type the inputs and submit the login form',
    async ({ wrapper }) => {
      // ARRANGE
      wrapper(LoginPage)
      const formLogin: HTMLFormElement = screen.getByRole('form', { name: /login/i })
      const inputUsername: HTMLInputElement = screen.getByRole('textbox', { name: /username/i })
      const inputPassword: HTMLInputElement = screen.getByRole('textbox', { name: /password/i })
      const buttonSubmit: HTMLButtonElement = screen.getByRole('button', { name: /login/i })
      formLogin.addEventListener('submit', mockSubmitFn)

      // ACT
      await fireEvent.update(inputUsername, validUsernameValue)
      await fireEvent.update(inputPassword, validPasswordValue)

      // ASSERT
      expect(inputUsername).toHaveValue(validUsernameValue)
      expect(inputPassword).toHaveValue(validPasswordValue)
      await fireEvent.click(buttonSubmit)
      expect(mockSubmitFn).toHaveBeenCalled()
    }
  )
})
