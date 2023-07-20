import { fireEvent, render, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import TodosFilter from './TodosFilter.vue'

describe('TodosFilter', () => {
  const validLimit = '10'
  const mockChangeFn = vi.fn()

  it('should render properly', () => {
    const result = render(TodosFilter)
    expect(() => result).not.toThrow()
  })

  it('should render and change limit correctly', async () => {
    // ARRANGE
    render(TodosFilter)
    const form: HTMLFormElement = screen.getByTestId('filter-form')
    const label: HTMLLabelElement = screen.getByTestId('filter-label')
    const select: HTMLInputElement = screen.getByTestId('filter-limit')
    const options: HTMLOptionElement[] = screen.getAllByRole('option')
    select.addEventListener('select', mockChangeFn)

    // ASSERT
    expect(form).toBeInTheDocument()
    expect(label).toBeInTheDocument()
    expect(select).toBeInTheDocument()
    expect(options.length).toBe(4)

    // ACT & ASSERT
    await fireEvent.select(select, { target: { value: validLimit } })
    expect(select.value).toBe(validLimit)
    expect(mockChangeFn).toHaveBeenCalled()
  })
})
