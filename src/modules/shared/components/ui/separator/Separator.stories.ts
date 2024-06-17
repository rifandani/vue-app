import type { Meta, StoryObj } from '@storybook/vue3'
import { Separator } from '.'

const meta = {
  title: 'UI/Separator',
  component: Separator,
} satisfies Meta<typeof Separator>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Separator },
    setup() {
      return { args }
    },
    template: `
      <div>
        <div class="space-y-1">
          <h4 class="text-sm font-medium leading-none">
            Radix Primitives
          </h4>
          <p class="text-sm text-muted-foreground">
            An open-source UI component library.
          </p>
        </div>
        <Separator class="my-4" v-bind="args" />
        <div class="flex h-5 items-center space-x-4 text-sm">
          <div>Blog</div>
          <Separator orientation="vertical" />
          <div>Docs</div>
          <Separator orientation="vertical" />
          <div>Source</div>
        </div>
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
