import { fireEvent, render, screen } from '@testing-library/vue'
import HomeClock from './HomeClock.vue'

describe('HomeClock', () => {
  it('should render properly', () => {
    const result = render(HomeClock)
    expect(() => result).not.toThrow()
  })

  it('should render toggle clock correctly', async () => {
    // ARRANGE
    render(HomeClock)
    const clockBtn: HTMLButtonElement = screen.getByTestId('home-clock-button-clock')

    // ACT
    await fireEvent.click(clockBtn)

    // ASSERT
    const div: HTMLDivElement = screen.getByTestId('home-clock-show')
    expect(div).toBeInTheDocument()
  })

  it('should render buttons correctly', () => {
    // ARRANGE
    render(HomeClock)
    const sortBtn: HTMLButtonElement = screen.getByTestId('home-clock-button-sort')
    const clockBtn: HTMLButtonElement = screen.getByTestId('home-clock-button-clock')
    const languageBtn: HTMLButtonElement = screen.getByTestId('home-clock-button-language')
    const startBtn: HTMLButtonElement = screen.getByTestId('home-clock-button-start')

    // ASSERT
    expect(sortBtn).toBeInTheDocument()
    expect(clockBtn).toBeInTheDocument()
    expect(languageBtn).toBeInTheDocument()
    expect(startBtn).toBeInTheDocument()
  })
})
