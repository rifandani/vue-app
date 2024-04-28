import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import Calendar from './Calendar.vue'

const meta = {
  title: 'UI/Calendar',
  tags: ['autodocs'],
  component: Calendar,
} satisfies Meta<typeof Calendar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Calendar },
    setup() {
      const date = ref(new Date(2024, 0, 1))

      return { args, date }
    },
    template: `
      <Calendar v-model="date" class="rounded-md border" v-bind="args" />
    `,
  }),
}

export const DatePicker: Story = {
  render: args => ({
    components: { Calendar },
    setup() {
      const date = ref(new Date(2024, 0, 1))

      return { args, date }
    },
    template: `
      <Calendar v-model="date" class="rounded-md border" v-bind="args" />
    `,
  }),
}
