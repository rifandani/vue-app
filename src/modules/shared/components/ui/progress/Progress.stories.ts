import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, watchEffect } from 'vue'
import { Progress } from '.'

const meta = {
  title: 'UI/Progress',
  component: Progress,
} satisfies Meta<typeof Progress>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Progress },
    setup() {
      const progress = ref(13)

      watchEffect((cleanupFn) => {
        const timer = setTimeout(() => progress.value = 66, 500)
        cleanupFn(() => clearTimeout(timer))
      })

      return { args, progress }
    },
    template: `
      <Progress v-model="progress" class="w-3/5" v-bind="args" />
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
