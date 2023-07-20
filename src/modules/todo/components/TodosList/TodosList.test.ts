import { render, screen } from '@testing-library/vue'
import TodosList from './TodosList.vue'

describe('TodosList', () => {
  it('should render properly', () => {
    const result = render(TodosList)
    expect(() => result).not.toThrow()
  })

  it('should render text contents correctly', () => {
    // ARRANGE
    render(TodosList)
    const loading: HTMLDivElement = screen.getByTestId('list-loading')

    // ASSERT
    expect(loading).toBeInTheDocument()
  })
})
