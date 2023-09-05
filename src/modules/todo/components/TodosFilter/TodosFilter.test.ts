import { testWrapper } from '@shared/utils/test.util'
import { fireEvent, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import TodosFilter from './TodosFilter.vue'

describe('TodosFilter', () => {
  const limitValue = '10'
  const mockSelectFn = vi.fn()

  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: TodosFilter })
    expect(() => result).not.toThrow()
  })

  testWrapper('should be able to select and submit the filter', async ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: TodosFilter })
    const form: HTMLFormElement = screen.getByRole('form')
    const select: HTMLInputElement = screen.getByRole('combobox', { name: /filter/i })
    const options: HTMLOptionElement[] = screen.getAllByRole('option')
    select.addEventListener('select', mockSelectFn)

    // ACT & ASSERT
    expect(form).toBeInTheDocument()
    expect(select).toBeInTheDocument()
    expect(options).toHaveLength(4)
    await fireEvent.select(select, { target: { value: limitValue } })
    expect(select).toHaveValue(limitValue)
    expect(mockSelectFn).toHaveBeenCalled()
  })
})
