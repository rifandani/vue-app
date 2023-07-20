import { fireEvent, render, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import LoginForm from './LoginForm.vue'

describe('LoginForm', () => {
  const validUsername = 'kminchelle'
  const validPassword = '0lelplR'
  const mockSubmitFn = vi.fn()

  it('should render properly', () => {
    const result = render(LoginForm)
    expect(() => result).not.toThrow()
  })

  it('should be able to type the inputs and submit the login form', async () => {
    // ARRANGE
    render(LoginForm)
    const form: HTMLFormElement = screen.getByTestId('login-form')
    const inputUsername: HTMLInputElement = screen.getByTestId('login-input-username')
    const inputPassword: HTMLInputElement = screen.getByTestId('login-input-password')
    const buttonSubmit: HTMLButtonElement = screen.getByTestId('login-button')
    form.addEventListener('submit', mockSubmitFn)

    // ACT
    await fireEvent.input(inputUsername, { target: { value: validUsername } })
    await fireEvent.input(inputPassword, { target: { value: validPassword } })

    // ASSERT
    expect(inputUsername.value).toBe(validUsername)
    expect(inputPassword.value).toBe(validPassword)
    await fireEvent.click(buttonSubmit)
    expect(mockSubmitFn).toHaveBeenCalled()
  })
})
