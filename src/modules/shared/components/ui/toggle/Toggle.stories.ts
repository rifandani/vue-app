import type { Meta, StoryObj } from '@storybook/vue3'
import { Icon } from '@iconify/vue'
import { Toggle } from '.'

const meta = {
  title: 'UI/Toggle',
  component: Toggle,
} satisfies Meta<typeof Toggle>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Toggle, Icon },
    setup() {
      return { args }
    },
    template: `
      <Toggle aria-label="Toggle italic" v-bind="args">
        <Icon icon="lucide:bold" class="h-4 w-4 mr-2" />
        Bold
      </Toggle>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const Disabled: Story = {
  render: args => ({
    components: { Toggle, Icon },
    setup() {
      return { args }
    },
    template: `
      <Toggle aria-label="Toggle italic" disabled v-bind="args">
        <Icon icon="lucide:bold" class="h-4 w-4 mr-2" />
        Bold
      </Toggle>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
