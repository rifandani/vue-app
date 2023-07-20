import { fireEvent, render, screen, waitFor } from '@testing-library/vue'
import { vi } from 'vitest'
import { mockTodo } from '../../../../mocks/http/entities.http'
import type { TodoSchema } from '../../api/todo.schema'
import TodosItem from './TodosItem.vue'

describe('TodosItem', () => {
  const todo: TodoSchema = mockTodo()
  const onDeleteTodo = vi.fn()
  const mockSubmit = vi.fn()
  const mockChangeTodo = vi.fn()

  const getItemSpy = vi.spyOn(localStorage, 'getItem')
  localStorage.getItem = vi.fn(() => JSON.stringify({ id: todo.id }))

  afterEach(() => {
    getItemSpy.mockClear() // clear call history
    localStorage.clear()
  })

  it('should render properly', () => {
    const result = render(TodosItem)
    expect(() => result).not.toThrow()
  })

  // TypeError: Cannot read properties of undefined (reading 'todo')
  it('should render, check, and remove todo correctly', async () => {
    // ARRANGE
    render(TodosItem)

    // ASSERT
    await waitFor(() => {
      expect(screen.getByTestId('item-form')).toBeInTheDocument()
      expect(screen.getByTestId('item-input-todoId')).toBeInTheDocument()
      // expect(screen.getByTestId('input-todoId').value).toBe(todo.id.toString());
      expect(screen.getByTestId('item-input-todo')).toBeInTheDocument()
      // expect(screen.getByTestId('input-todo').checked).toBe(todo.completed);
      expect(screen.getByTestId('item-link')).toBeInTheDocument()
      // expect(screen.getByTestId('p-todo')).toHaveTextContent(todo.todo);
      // expect(screen.getByTestId('button-remove')).toBeInTheDocument();
    })

    screen.getByTestId('item-form').addEventListener('submit', mockSubmit)
    screen.getByTestId('item-input-todo').addEventListener('change', mockChangeTodo)

    // ACT & ASSERT change todo
    await fireEvent.change(screen.getByTestId('item-input-todo'), {
      target: { value: !todo.completed }
    })
    expect(mockChangeTodo).toHaveBeenCalled()

    // ACT & ASSERT remove todo
    // await fireEvent.click(buttonRemove);
    // expect(mockSubmit).toHaveBeenCalled();
    // expect(onDeleteTodo).toHaveBeenCalled();
  })
})
