import type { Meta, StoryObj } from '@storybook/vue3'
import { Checkbox } from '../checkbox'
import { Label } from '.'

const meta = {
  title: 'UI/Label',
  component: Label,
} satisfies Meta<typeof Label>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Label, Checkbox },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center space-x-2">
        <Checkbox id="terms" />
        <Label for="terms">Accept terms and conditions</Label>
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
