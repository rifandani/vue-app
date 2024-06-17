import type { Meta, StoryObj } from '@storybook/vue3'
import { Label } from '../label'
import { Textarea } from '.'

const meta = {
  title: 'UI/Textarea',
  component: Textarea,
} satisfies Meta<typeof Textarea>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Textarea },
    setup() {
      return { args }
    },
    template: `
      <Textarea placeholder="Type your message here." v-bind="args" />
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const WithLabel: Story = {
  render: args => ({
    components: { Textarea, Label },
    setup() {
      return { args }
    },
    template: `
      <div class="grid w-full gap-1.5">
        <Label for="message">Your message</Label>
        <Textarea id="message" placeholder="Type your message here." v-bind="args" />
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
