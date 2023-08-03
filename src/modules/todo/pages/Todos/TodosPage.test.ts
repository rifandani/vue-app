import { screen, type ByRoleOptions } from '@testing-library/vue'
import { testWrapper } from '../../../shared/utils/test.util'
import TodosPage from './TodosPage.vue'

describe('TodosPage', () => {
  const createOptions: ByRoleOptions = { name: /add/i }
  const filterOptions: ByRoleOptions = { name: /filter/i }

  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: TodosPage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render content roles correctly', ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: TodosPage })
    const title = screen.getByRole('heading', { name: /todo list/i })
    const formCreate: HTMLFormElement = screen.getByRole('form', createOptions)
    const inputTodo: HTMLInputElement = screen.getByRole('textbox', createOptions)
    const buttonSubmit: HTMLButtonElement = screen.getByRole('button', createOptions)
    const formFilter: HTMLFormElement = screen.getByRole('form', filterOptions)
    const selectFilter: HTMLInputElement = screen.getByRole('combobox', { name: /limit/i })
    const optionsFilter: HTMLOptionElement[] = screen.getAllByRole('option')

    // ASSERT
    expect(title).toBeInTheDocument()
    expect(formCreate).toBeInTheDocument()
    expect(inputTodo).toBeInTheDocument()
    expect(buttonSubmit).toBeInTheDocument()
    expect(formFilter).toBeInTheDocument()
    expect(selectFilter).toBeInTheDocument()
    expect(optionsFilter).toHaveLength(4)
  })
})
