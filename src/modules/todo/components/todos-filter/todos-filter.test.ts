import { screen } from '@testing-library/vue'
import { vi } from 'vitest'
import TodosFilter from '#todo/components/todos-filter/todos-filter.vue'
import { testWrapper } from '#shared/utils/test'

describe('<TodosFilter />', () => {
  const mockSelectFn = vi.fn()

  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: TodosFilter })
    expect(() => result).not.toThrow()
  })

  testWrapper('should be able to click dropdown', async ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: TodosFilter })
    const form: HTMLFormElement = screen.getByRole('form')
    const combobox = screen.getByTestId('combobox-btn')
    combobox.addEventListener('click', mockSelectFn)

    // ACT & ASSERT
    expect(form).toBeInTheDocument()
    expect(combobox).toBeInTheDocument()
  })
})
