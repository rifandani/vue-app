import { testWrapper } from '@shared/utils/test.util'
import userEvent from '@testing-library/user-event'
import { screen } from '@testing-library/vue'
import { vi } from 'vitest'
import TodosFilter from './TodosFilter.vue'

describe('TodosFilter', () => {
  const mockSelectFn = vi.fn()

  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: TodosFilter })
    expect(() => result).not.toThrow()
  })

  testWrapper('should be able to click dropdown', async ({ wrapper }) => {
    // ARRANGE
    const user = userEvent.setup()
    wrapper({ component: TodosFilter })
    const form: HTMLFormElement = screen.getByRole('form')
    const combobox: HTMLInputElement = screen.getByRole('combobox')
    combobox.addEventListener('click', mockSelectFn)

    // ACT & ASSERT
    expect(form).toBeInTheDocument()
    expect(combobox).toBeInTheDocument()
    await user.click(combobox)
    expect(mockSelectFn).toHaveBeenCalled()
  })
})
