import { render, screen } from '@testing-library/vue'
import LoginPage from './LoginPage.vue'

describe('LoginPage', () => {
  it('should render properly', () => {
    const result = render(LoginPage)
    expect(() => result).not.toThrow()
  })

  it('should render text contents correctly', () => {
    // ARRANGE
    render(LoginPage)
    const anchor: HTMLAnchorElement = screen.getByTitle(/Home/)
    const paragraph: HTMLParagraphElement = screen.getByTestId(/Welcome Back/)
    const image: HTMLImageElement = screen.getByAltText(/login page cover/)

    // ASSERT
    expect(anchor).toBeInTheDocument()
    expect(paragraph).toBeInTheDocument()
    expect(image).toBeInTheDocument()
  })
})
