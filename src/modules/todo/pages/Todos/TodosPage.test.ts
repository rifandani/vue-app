import { render, screen } from '@testing-library/vue'
import TodosPage from './TodosPage.vue'

describe('TodosPage', () => {
  it('should render properly', () => {
    const result = render(TodosPage)
    expect(() => result).not.toThrow()
  })

  it('should render text contents correctly', () => {
    // ARRANGE
    render(TodosPage)
    const title = screen.getByTestId('todos-title')

    // ASSERT
    expect(title).toBeInTheDocument()
  })
})
