import { screen } from '@testing-library/vue'
import ClockSectionTimer from '#home/components/clock-section/clock-section-timer.vue'
import { testWrapper } from '#shared/utils/test'

describe('<ClockSectionTimer />', () => {
  testWrapper('should render clock timer', async ({ wrapper }) => {
    // ARRANGE
    const date = new Date()
    wrapper<typeof ClockSectionTimer>({
      component: ClockSectionTimer,
      props: {
        hours: date.getHours(),
        minutes: date.getMinutes(),
        seconds: date.getSeconds(),
      },
    })

    // ASSERT
    expect(screen.getByTestId('clock-section-timer')).toBeInTheDocument()
  })
})
