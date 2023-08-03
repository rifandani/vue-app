import { fireEvent, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import { testWrapper } from '../../../shared/utils/test.util'
import TodosFilter from './TodosFilter.vue'

describe('TodosFilter', () => {
  const limitValue = '10'
  const mockSelectFn = vi.fn()

  testWrapper('should be able to select and submit the filter', async ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: TodosFilter })
    const select: HTMLInputElement = screen.getByRole('combobox', { name: /limit/i })
    select.addEventListener('select', mockSelectFn)

    // ASSERT
    await fireEvent.select(select, { target: { value: limitValue } })
    expect(select).toHaveValue(limitValue)
    expect(mockSelectFn).toHaveBeenCalled()
  })
})
