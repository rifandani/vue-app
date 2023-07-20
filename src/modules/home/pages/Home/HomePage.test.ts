import { render, screen } from '@testing-library/vue'
import HomePage from './HomePage.vue'

describe('HomePage', () => {
  it('should render properly', () => {
    const result = render(HomePage)
    expect(() => result).not.toThrow()
  })

  it('should render text contents correctly', () => {
    // ARRANGE
    render(HomePage)
    const heading: HTMLHeadingElement = screen.getByTestId('home-title')

    // ASSERT
    expect(heading).toBeInTheDocument()
  })
})
