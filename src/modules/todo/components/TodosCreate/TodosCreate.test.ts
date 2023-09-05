import { testWrapper } from '@shared/utils/test.util'
import { fireEvent, screen, type ByRoleOptions } from '@testing-library/vue'
import { vi } from 'vitest'
import TodosCreate from './TodosCreate.vue'

describe('TodosCreate', () => {
  const todoValue = 'new todo'
  const mockCreateSubmitFn = vi.fn()

  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: TodosCreate })
    expect(() => result).not.toThrow()
  })

  testWrapper(
    'should be able to type the inputs and submit the create todo form',
    async ({ wrapper }) => {
      // ARRANGE
      wrapper({ component: TodosCreate })
      const createOptions: ByRoleOptions = { name: /add/i }
      const formCreate: HTMLFormElement = screen.getByRole('form', createOptions)
      const inputTodo: HTMLInputElement = screen.getByRole('textbox', createOptions)
      const buttonSubmit: HTMLButtonElement = screen.getByRole('button', createOptions)
      formCreate.addEventListener('submit', mockCreateSubmitFn)

      // ACT & ASSERT
      expect(formCreate).toBeInTheDocument()
      expect(inputTodo).toBeInTheDocument()
      expect(buttonSubmit).toBeInTheDocument()
      await fireEvent.update(inputTodo, todoValue)
      expect(inputTodo).toHaveValue(todoValue)
      await fireEvent.click(buttonSubmit)
      expect(mockCreateSubmitFn).toHaveBeenCalled()
    }
  )
})
