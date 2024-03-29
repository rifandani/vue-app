import { screen } from '@testing-library/vue'
import { vi } from 'vitest'
import userEvent from '@testing-library/user-event'
import ClockSection from '#home/components/clock-section/clock-section.vue'
import { testWrapper } from '#shared/utils/test'

describe('<ClockSection />', () => {
  const mockButtonFn = vi.fn()

  testWrapper('should render clock when toggle clock button clicked', async ({ wrapper }) => {
    // ARRANGE
    wrapper<typeof ClockSection>({ component: ClockSection })
    const user = userEvent.setup()
    const button: HTMLButtonElement = screen.getByTestId(/home-clock-button-clock/i)

    // ACT & ASSERT
    await user.click(button)
    expect(screen.getByTestId('clock-section-timer')).toBeInTheDocument()
  })

  // TODO: figure out how to solve the randomness
  testWrapper.todo('should shuffle buttons when sort button clicked', async ({ wrapper }) => {
    // ARRANGE
    wrapper<typeof ClockSection>({ component: ClockSection })
    const user = userEvent.setup()
    const buttonsBefore: HTMLButtonElement[] = screen.queryAllByTestId(/home-clock-button/i)
    const button: HTMLButtonElement = screen.getByTestId(/home-clock-button-sort/i)

    // ACT & ASSERT
    await user.click(button)
    const buttonsAfter: HTMLButtonElement[] = screen.queryAllByTestId(/home-clock-button/i)
    expect(buttonsBefore[0]).not.toHaveTextContent(buttonsAfter[0].textContent as string)
    expect(buttonsBefore[1]).not.toHaveTextContent(buttonsAfter[1].textContent as string)
    expect(buttonsBefore[2]).not.toHaveTextContent(buttonsAfter[2].textContent as string)
    expect(buttonsBefore[3]).not.toHaveTextContent(buttonsAfter[3].textContent as string)
  })

  testWrapper(
    'should call mocked navigate function when get started button clicked',
    async ({ wrapper }) => {
      // ARRANGE
      wrapper<typeof ClockSection>({ component: ClockSection })
      const user = userEvent.setup()
      const button: HTMLButtonElement = screen.getByTestId(/home-clock-button-start/i)
      button.addEventListener('click', mockButtonFn)

      // ACT & ASSERT
      await user.click(button)
      expect(mockButtonFn).toHaveBeenCalled()
    },
  )
})
