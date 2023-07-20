import { render, screen } from '@testing-library/vue'
import TodoPage from './TodoPage.vue'

describe('TodoPage', () => {
  it('should render properly', () => {
    const result = render(TodoPage)
    expect(() => result).not.toThrow()
  })

  it('should render text contents correctly', () => {
    // ARRANGE
    render(TodoPage)
    const anchor: HTMLAnchorElement = screen.getByTestId('todos-link')
    const title: HTMLHeadingElement = screen.getByTestId('todos-title')

    // ASSERT
    expect(anchor).toBeInTheDocument()
    expect(title).toBeInTheDocument()
  })
})
