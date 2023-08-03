import { fireEvent, screen } from '@testing-library/vue'
import { vi } from 'vitest'
import { testWrapper } from '../../../shared/utils/test.util'
import HomeClock from './HomeClock.vue'

describe('HomeClock', () => {
  const mockButtonFn = vi.fn()

  testWrapper('should render clock when toggle clock button clicked', async ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: HomeClock })
    const button: HTMLButtonElement = screen.getByTestId(/home-clock-button-clock/i)

    // ACT
    await fireEvent.click(button)

    // ASSERT
    expect(screen.queryByTestId('home-clock-show')).toBeInTheDocument()
  })

  testWrapper.todo('should shuffle buttons when sort button clicked', async ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: HomeClock })
    const buttonsBefore: HTMLButtonElement[] = screen.queryAllByTestId(/home-clock-button/i)
    const button: HTMLButtonElement = screen.getByTestId(/home-clock-button-sort/i)

    // ACT
    await fireEvent.click(button)
    const buttonsAfter: HTMLButtonElement[] = screen.queryAllByTestId(/home-clock-button/i)

    // TODO: figure out how to solve this
    // ASSERT
    expect(buttonsBefore[0]).not.toHaveTextContent(buttonsAfter[0].textContent as string)
    expect(buttonsBefore[1]).not.toHaveTextContent(buttonsAfter[1].textContent as string)
    expect(buttonsBefore[2]).not.toHaveTextContent(buttonsAfter[2].textContent as string)
    expect(buttonsBefore[3]).not.toHaveTextContent(buttonsAfter[3].textContent as string)
  })

  testWrapper('should translate text when change language button clicked', async ({ wrapper }) => {
    // ARRANGE
    wrapper({ component: HomeClock })
    const button: HTMLButtonElement = screen.getByTestId(/home-clock-button-language/i)

    // ASSERT
    expect(button).toHaveTextContent(/change language/i)

    // ACT
    await fireEvent.click(button)

    // ASSERT
    expect(button).toHaveTextContent(/ganti bahasa/i)
  })

  testWrapper(
    'should call mocked navigate function when get started button clicked',
    async ({ wrapper }) => {
      // ARRANGE
      wrapper({ component: HomeClock })
      const button: HTMLButtonElement = screen.getByTestId(/home-clock-button-start/i)
      button.addEventListener('click', mockButtonFn)

      // ACT
      await fireEvent.click(button)

      // ASSERT
      expect(mockButtonFn).toHaveBeenCalled()
    }
  )
})
