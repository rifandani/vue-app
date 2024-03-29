import { screen } from '@testing-library/vue'
import NotFoundPage from '#auth/pages/not-found/page.vue'
import { testWrapper } from '#shared/utils/test'

describe('<NotFoundPage />', () => {
  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper<typeof NotFoundPage>({ component: NotFoundPage })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render text contents correctly', ({ wrapper }) => {
    // ARRANGE
    wrapper<typeof NotFoundPage>({ component: NotFoundPage })
    const heading: HTMLHeadingElement = screen.getByText(/Not Found/)
    const paragraph: HTMLParagraphElement = screen.getByText(/It's gone/)
    const anchor: HTMLAnchorElement = screen.getByTestId('notFound-link') // there are no text inside a stubbed router link

    // ASSERT
    expect(heading).toBeInTheDocument()
    expect(paragraph).toBeInTheDocument()
    expect(anchor).toBeInTheDocument()
  })
})
