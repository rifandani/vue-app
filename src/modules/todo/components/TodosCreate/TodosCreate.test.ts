import { testWrapper } from '@shared/utils/test.util'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/vue'
import { vi } from 'vitest'
import TodosCreate from './TodosCreate.vue'

describe('todosCreate', () => {
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
      const user = userEvent.setup()
      wrapper({ component: TodosCreate })
      const formCreate: HTMLFormElement = screen.getByTestId('form-create')
      const inputTodo: HTMLInputElement = screen.getByTestId('input-create')
      const buttonSubmit: HTMLButtonElement = screen.getByTestId('button-create')
      formCreate.addEventListener('submit', mockCreateSubmitFn)

      // ACT & ASSERT
      await user.type(inputTodo, todoValue)
      expect(inputTodo).toHaveValue(todoValue)
      await user.click(buttonSubmit)
      expect(mockCreateSubmitFn).toHaveBeenCalled()
    },
  )
})
