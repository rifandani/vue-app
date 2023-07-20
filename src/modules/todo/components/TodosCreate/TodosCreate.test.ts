import { fireEvent, render, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import TodosCreate from './TodosCreate.vue'

describe('TodosCreate', () => {
  const validInput = 'new todo'
  const mockSubmitFn = vi.fn()

  it('should render properly', () => {
    const result = render(TodosCreate)
    expect(() => result).not.toThrow()
  })

  it('should render and submit form correctly', async () => {
    // ARRANGE
    render(TodosCreate)
    const form: HTMLFormElement = screen.getByTestId('create-form')
    const input: HTMLInputElement = screen.getByTestId('create-input')
    const button: HTMLButtonElement = screen.getByTestId('create-button')
    form.addEventListener('submit', mockSubmitFn)

    // ASSERT
    expect(form).toBeInTheDocument()
    expect(input).toBeInTheDocument()
    expect(button).toBeInTheDocument()

    // ACT & ASSERT
    await fireEvent.input(input, { target: { value: validInput } })
    expect(input.value).toBe(validInput)
    await fireEvent.click(button)
    expect(mockSubmitFn).toHaveBeenCalled()
  })
})
