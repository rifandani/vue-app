import { testWrapper } from '@shared/utils/test.util'
import { fireEvent, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import LoginForm from './LoginForm.vue'

describe('LoginForm', () => {
  const validUsernameValue = 'kminchelle'
  const validPasswordValue = '0lelplR'
  const mockSubmitFn = vi.fn()

  testWrapper(
    'should be able to type the inputs and submit the login form',
    async ({ wrapper }) => {
      // ARRANGE
      wrapper({ component: LoginForm })
      const formLogin: HTMLFormElement = screen.getByRole('form', { name: /login/i })
      const inputUsername: HTMLInputElement = screen.getByRole('textbox', { name: /username/i })
      const inputPassword: HTMLInputElement = screen.getByRole('textbox', { name: /password/i })
      const buttonSubmit: HTMLButtonElement = screen.getByRole('button', { name: /login/i })
      formLogin.addEventListener('submit', mockSubmitFn)

      // ACT & ASSERT
      await fireEvent.update(inputUsername, validUsernameValue)
      await fireEvent.update(inputPassword, validPasswordValue)
      expect(inputUsername).toHaveValue(validUsernameValue)
      expect(inputPassword).toHaveValue(validPasswordValue)
      await fireEvent.click(buttonSubmit)
      expect(mockSubmitFn).toHaveBeenCalled()
    }
  )
})
