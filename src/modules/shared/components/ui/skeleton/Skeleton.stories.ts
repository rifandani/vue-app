import type { Meta, StoryObj } from '@storybook/vue3'
import { Skeleton } from '.'

const meta = {
  title: 'UI/Skeleton',
  component: Skeleton,
} satisfies Meta<typeof Skeleton>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Skeleton },
    setup() {
      return { args }
    },
    template: `
      <div class="flex items-center space-x-4">
        <Skeleton class="h-12 w-12 rounded-full" v-bind="args" />
        <div class="space-y-2">
          <Skeleton class="h-4 w-[250px]" />
          <Skeleton class="h-4 w-[200px]" />
        </div>
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
