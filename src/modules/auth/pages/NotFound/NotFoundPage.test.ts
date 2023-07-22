import { screen } from '@testing-library/vue'
import { navigatorDetector } from 'typesafe-i18n/detectors'
import { detectLocale } from '../../../../i18n/i18n-util'
import { loadLocaleAsync } from '../../../../i18n/i18n-util.async'
import { renderWrapper } from '../../../shared/utils/test.util'
import NotFoundPage from './NotFoundPage.vue'

// vi.mock('../../../../i18n/i18n-vue', () => ({
//   typesafeI18n: vi.fn(() => ({
//     LL: {
//       auth: {
//         notFound404: vi.fn(() => ''),
//         gone: vi.fn(() => ''),
//         backTo: vi.fn(() => '')
//       }
//     }
//   }))
// }))

describe('NotFoundPage', () => {
  // detect user's preferred locale
  const detectedLocale = detectLocale(navigatorDetector)
  const wrapper = renderWrapper(detectedLocale)

  beforeAll(async () => {
    await loadLocaleAsync(detectedLocale)
  })

  it('should render properly', () => {
    const result = wrapper(NotFoundPage)
    expect(() => result).not.toThrow()
  })

  it('should render text contents correctly', () => {
    // ARRANGE
    wrapper(NotFoundPage)
    const heading: HTMLHeadingElement = screen.getByTestId('notFound-title')
    const paragraph: HTMLParagraphElement = screen.getByTestId('notFound-subtitle')
    const anchor: HTMLAnchorElement = screen.getByTestId('notFound-link')

    // ASSERT
    expect(heading).toBeInTheDocument()
    expect(paragraph).toBeInTheDocument()
    expect(anchor).toBeInTheDocument()
  })
})
