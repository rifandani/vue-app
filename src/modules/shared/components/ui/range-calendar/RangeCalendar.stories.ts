import type { Meta, StoryObj } from '@storybook/vue3'
import { getLocalTimeZone, today } from '@internationalized/date'
import { type Ref, ref } from 'vue'
import { type DateRange, RangeCalendar, RangeCalendarCell, RangeCalendarCellTrigger, RangeCalendarGrid, RangeCalendarGridBody, RangeCalendarGridHead, RangeCalendarGridRow, RangeCalendarHeadCell, RangeCalendarHeader, RangeCalendarHeading, RangeCalendarNextButton, RangeCalendarPrevButton } from '.'

const subcomponents = {
  RangeCalendarCell,
  RangeCalendarCellTrigger,
  RangeCalendarGrid,
  RangeCalendarGridBody,
  RangeCalendarGridHead,
  RangeCalendarGridRow,
  RangeCalendarHeadCell,
  RangeCalendarHeader,
  RangeCalendarHeading,
  RangeCalendarNextButton,
  RangeCalendarPrevButton,
}

const meta = {
  title: 'UI/RangeCalendar',
  component: RangeCalendar,
  subcomponents,
} satisfies Meta<typeof RangeCalendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { RangeCalendar, ...subcomponents },
    setup() {
      const start = today(getLocalTimeZone())
      const end = start.add({ days: 7 })

      const value = ref({
        start,
        end,
      }) as Ref<DateRange>

      return { args, value }
    },
    template: `
      <RangeCalendar v-model="value" class="rounded-md border" v-bind="args" />
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
