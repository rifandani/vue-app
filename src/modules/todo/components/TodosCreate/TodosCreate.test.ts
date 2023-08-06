import { fireEvent, screen, type ByRoleOptions } from '@testing-library/vue'
import { vi } from 'vitest'
import { testWrapper } from '../../../shared/utils/test.util'
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

      // ASSERT
      expect(formCreate).toBeInTheDocument()
      expect(inputTodo).toBeInTheDocument()
      expect(buttonSubmit).toBeInTheDocument()

      // ACT
      formCreate.addEventListener('submit', mockCreateSubmitFn)
      await fireEvent.update(inputTodo, todoValue)

      // ASSERT
      expect(inputTodo).toHaveValue(todoValue)
      await fireEvent.click(buttonSubmit)
      expect(mockCreateSubmitFn).toHaveBeenCalled()
    }
  )
})
