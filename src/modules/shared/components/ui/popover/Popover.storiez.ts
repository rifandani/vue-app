import type { Meta, StoryObj } from '@storybook/vue3'
import { Popover, PopoverContent, PopoverTrigger } from '.'

const subcomponents = {
  PopoverTrigger,
  PopoverContent,
}

const meta = {
  title: 'UI/Popover',
  component: Popover,
  subcomponents,
} satisfies Meta<typeof Popover>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Popover, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <Popover v-bind="args">
        <PopoverTrigger>
          Open popover
        </PopoverTrigger>
        <PopoverContent>
          Some popover content
        </PopoverContent>
      </Popover>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
