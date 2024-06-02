import type { Meta, StoryObj } from '@storybook/vue3'
import { type DateValue, getLocalTimeZone, today } from '@internationalized/date'
import { type Ref, ref } from 'vue'
import Calendar from './Calendar.vue'

const meta = {
  title: 'UI/Calendar',
  component: Calendar,
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Calendar },
    setup() {
      const value = ref(today(getLocalTimeZone())) as Ref<DateValue>

      return { args, value }
    },
    template: `
      <Calendar v-model="value" :weekday-format="'short'" class="rounded-md border" v-bind="args" />
    `,
  }),
}
