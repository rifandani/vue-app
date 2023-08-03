import { fireEvent, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import { mockTodo } from '../../../../mocks/http/entities.http'
import { testWrapper } from '../../../shared/utils/test.util'
import type { TodoSchema } from '../../api/todo.schema'
import TodosItem from './TodosItem.vue'

describe('TodosItem', () => {
  // vi.mock('../../../shared/composables/useUserStorage/useUserStorage.composable', () => ({
  //   useUserStorage: mockLogin()
  // }))

  const todo: TodoSchema = mockTodo()
  // const onDeleteTodo = vi.fn()
  const mockSubmit = vi.fn()
  const mockChangeTodo = vi.fn()

  const getItemSpy = vi.spyOn(localStorage, 'getItem')
  // localStorage.getItem = vi.fn(() => JSON.stringify({ id: todo.id }))

  afterEach(() => {
    getItemSpy.mockClear() // clear call history
    localStorage.clear()
  })

  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: TodosItem, props: { todo } })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render, check checkbox correctly', async ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: TodosItem, props: { todo } })
    const form: HTMLFormElement = await screen.findByRole('form', { name: /todo/i })
    const inputId: HTMLInputElement = await screen.findByTestId('input-todoId')
    const inputTodo: HTMLInputElement = await screen.findByRole('checkbox', { name: /todo/i })
    const link: HTMLAnchorElement = await screen.findByRole('link', { name: /todo/i })

    // ASSERT
    expect(form).toBeInTheDocument()
    expect(inputId).toBeInTheDocument()
    expect(inputId).toHaveValue(todo.id.toString())
    expect(inputTodo).toBeInTheDocument()
    expect(inputTodo).not.toBeChecked()
    expect(link).toBeInTheDocument()

    form.addEventListener('submit', mockSubmit)
    inputTodo.addEventListener('change', mockChangeTodo)

    // ACT & ASSERT change todo
    await fireEvent.click(inputTodo)
    expect(mockChangeTodo).toHaveBeenCalled()
  })

  // FIXME: Unable to find role="button"
  testWrapper.todo('should remove todo item correctly', async ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: TodosItem, props: { todo } })
    const removeBtn: HTMLButtonElement = await screen.findByRole('button')

    // ASSERT
    expect(removeBtn).toBeInTheDocument()

    // ACT & ASSERT remove todo
    // await fireEvent.click(buttonRemove);
    // expect(mockSubmit).toHaveBeenCalled();
    // expect(onDeleteTodo).toHaveBeenCalled();
  })
})
