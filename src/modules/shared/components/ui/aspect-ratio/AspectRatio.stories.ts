import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from '@storybook/test'
import AspectRatio from './AspectRatio.vue'

const meta = {
  title: 'UI/AspectRatio',
  component: AspectRatio,
  render: args => ({
    components: { AspectRatio },
    setup() {
      return { args }
    },
    template: `
      <AspectRatio v-bind="args">
        <img
          src="https://images.unsplash.com/photo-1588345921523-c2dcdb7f1dcd?w=800&dpr=2&q=80"
          alt="Photo by Drew Beamer"
          class="rounded-md object-cover w-full h-full"
        >
      </AspectRatio>
    `,
  }),
} satisfies Meta<typeof AspectRatio>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  // see: https://storybook.js.org/docs/writing-tests/interaction-testing
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const img = canvas.getByRole('img', { name: 'Photo by Drew Beamer' })

    await ctx.step('Components exists', async () => {
      await expect(img).toBeVisible()
    })
  },
}

export const Ratio: Story = {
  args: {
    ratio: 16 / 9,
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const img = canvas.getByRole('img', { name: 'Photo by Drew Beamer' })

    await ctx.step('Components exists', async () => {
      await expect(img).toBeVisible()
    })
  },
}
