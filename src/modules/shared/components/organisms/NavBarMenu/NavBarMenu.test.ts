import { themes } from '@shared/constants/global.constant'
import { testWrapper } from '@shared/utils/test.util'
import { fireEvent, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import NavBarMenu from './NavBarMenu.vue'

describe('NavBarMenu', () => {
  const mockModeBtn = vi.fn()

  testWrapper('should render properly', ({ wrapper }) => {
    const result = wrapper({ component: NavBarMenu })
    expect(() => result).not.toThrow()
  })

  testWrapper('should render role contents correctly', async ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: NavBarMenu })
    const link: HTMLAnchorElement = screen.getByRole('link', { name: /todos/i })
    const themeBtn: HTMLButtonElement = screen.getByRole('button', { name: /theme/i })
    const modesBtn: HTMLButtonElement[] = screen.getAllByRole('button', { name: /mode/i })
    modesBtn[0].addEventListener('click', mockModeBtn)

    // ACT & ASSERT
    await fireEvent.click(modesBtn[0])
    expect(link).toBeInTheDocument()
    expect(themeBtn).toBeInTheDocument()
    expect(modesBtn).toHaveLength(themes.length)
    expect(mockModeBtn).toHaveBeenCalled()
  })
})
