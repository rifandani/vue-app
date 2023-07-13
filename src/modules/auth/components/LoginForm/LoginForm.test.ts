import { fireEvent, render, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import TestWrapper from '../../../shared/components/atoms/TestWrapper.app.vue'
import LoginForm from './LoginForm.vue'

describe('LoginForm', () => {
  const validUsername = 'kminchelle'
  const validPassword = '0lelplR'
  const mockSubmitFn = vi.fn()

  it('should render properly', () => {
    const result = render(TestWrapper, { props: { component: LoginForm } })
    expect(() => result).not.toThrow()
  })

  it('should be able to type the inputs and submit the login form', async () => {
    // ARRANGE
    render(TestWrapper, { props: { component: LoginForm } })
    const form: HTMLFormElement = screen.getByTestId('form')
    const inputUsername: HTMLInputElement = screen.getByTestId('input-username')
    const inputPassword: HTMLInputElement = screen.getByTestId('input-password')
    const buttonSubmit: HTMLButtonElement = screen.getByTestId('button-submit')
    form.addEventListener('submit', mockSubmitFn)

    // ACT
    await fireEvent.change(inputUsername, { target: { value: validUsername } })
    await fireEvent.change(inputPassword, { target: { value: validPassword } })

    // ASSERT
    expect(inputUsername.value).toBe(validUsername)
    expect(inputPassword.value).toBe(validPassword)
    await fireEvent.click(buttonSubmit)
    expect(mockSubmitFn).toHaveBeenCalled()
  })
})
