import type { Meta, StoryObj } from '@storybook/vue3'
import { Label } from '../label'
import { Switch } from '.'

const meta = {
  title: 'UI/Switch',
  component: Switch,
} satisfies Meta<typeof Switch>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Switch, Label },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center space-x-2">
        <Switch id="airplane-mode" />
        <Label for="airplane-mode">Airplane Mode</Label>
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
