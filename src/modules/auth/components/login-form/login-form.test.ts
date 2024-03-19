import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/vue'
import { vi } from 'vitest'
import LoginForm from '#auth/components/login-form/login-form.vue'
import { testWrapper } from '#shared/utils/test'

describe('<LoginForm />', () => {
  const validUsernameValue = 'kminchelle'
  const validPasswordValue = '0lelplR'
  const mockSubmitFn = vi.fn()

  testWrapper(
    'should be able to type the inputs and submit the login form',
    async ({ wrapper }) => {
      // ARRANGE
      const user = userEvent.setup()
      wrapper({ component: LoginForm })
      const formLogin: HTMLFormElement = screen.getByTestId('form-login')
      const inputUsername: HTMLInputElement = screen.getByTestId('input-username')
      const inputPassword: HTMLInputElement = screen.getByTestId('input-password')
      const buttonLogin: HTMLButtonElement = screen.getByTestId('button-login')
      formLogin.addEventListener('submit', mockSubmitFn)

      // ACT & ASSERT
      await user.type(inputUsername, validUsernameValue)
      await user.type(inputPassword, validPasswordValue)
      expect(inputUsername).toHaveValue(validUsernameValue)
      expect(inputPassword).toHaveValue(validPasswordValue)
      await user.click(buttonLogin)
      expect(mockSubmitFn).toHaveBeenCalled()
    },
  )
})
