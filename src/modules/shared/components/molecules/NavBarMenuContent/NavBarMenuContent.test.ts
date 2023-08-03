import { fireEvent, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import { themes } from '../../../constants/global.constant'
import { testWrapper } from '../../../utils/test.util'
import NavBarMenuContent from './NavBarMenuContent.vue'

describe('NavBarMenuContent', () => {
  const mockModeBtn = vi.fn()

  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: NavBarMenuContent })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render role contents correctly', async ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: NavBarMenuContent })
    const link: HTMLAnchorElement = screen.getByRole('link', { name: /todos/i })
    const themeBtn: HTMLButtonElement = screen.getByRole('button', { name: /theme/i })
    const modesBtn: HTMLButtonElement[] = screen.getAllByRole('button', { name: /mode/i })

    modesBtn[0].addEventListener('click', mockModeBtn)
    await fireEvent.click(modesBtn[0])

    // ASSERT
    expect(link).toBeInTheDocument()
    expect(themeBtn).toBeInTheDocument()
    expect(modesBtn).toHaveLength(themes.length)
    expect(mockModeBtn).toHaveBeenCalled()
  })
})
