import { testWrapper } from '@shared/utils/test.util'
import { screen } from '@testing-library/vue'
import NotFoundPage from './NotFoundPage.vue'

describe('NotFoundPage', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: NotFoundPage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render text contents correctly', ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: NotFoundPage })
    const heading: HTMLHeadingElement = screen.getByText(/404: Not Found/)
    const paragraph: HTMLParagraphElement = screen.getByText(/It's gone/)
    const anchor: HTMLAnchorElement = screen.getByTestId('notFound-link') // there are no text inside a stubbed router link

    // ASSERT
    expect(heading).toBeInTheDocument()
    expect(paragraph).toBeInTheDocument()
    expect(anchor).toBeInTheDocument()
  })
})
