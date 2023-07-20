import { render, screen } from '@testing-library/vue'
import NotFoundPage from './NotFoundPage.vue'

describe('NotFoundPage', () => {
  it('should render properly', () => {
    const result = render(NotFoundPage)
    expect(() => result).not.toThrow()
  })

  it('should render text contents correctly', () => {
    // ARRANGE
    render(NotFoundPage)
    const heading: HTMLHeadingElement = screen.getByTestId('notFound-title')
    const paragraph: HTMLParagraphElement = screen.getByTestId('notFound-subtitle')
    const anchor: HTMLAnchorElement = screen.getByTestId('notFound-link')

    // ASSERT
    expect(heading).toBeInTheDocument()
    expect(paragraph).toBeInTheDocument()
    expect(anchor).toBeInTheDocument()
  })
})
