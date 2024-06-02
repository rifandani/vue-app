import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from '@storybook/test'
import Avatar from './Avatar.vue'
import AvatarFallback from './AvatarFallback.vue'
import AvatarImage from './AvatarImage.vue'

const subcomponents = {
  AvatarFallback,
  AvatarImage,
}

const meta = {
  title: 'UI/Avatar',
  component: Avatar,
  subcomponents,
  render: args => ({
    components: { Avatar, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <Avatar v-bind="args">
        <AvatarImage src="https://github.com/radix-vue.png" alt="@radix-vue" />
        <AvatarFallback>RV</AvatarFallback>
      </Avatar>
    `,
  }),
} satisfies Meta<typeof Avatar>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    shape: 'circle',
    size: 'sm',
  },
  // see: https://storybook.js.org/docs/writing-tests/interaction-testing
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)

    await ctx.step('Components exists', async () => {
      const img = await canvas.findByAltText('@radix-vue')
      const span = img.parentElement as HTMLSpanElement
      await expect(img).toBeVisible()
      await expect(span.classList.contains('rounded-full')).toBeTruthy()
      await expect(span.classList.contains('size-10')).toBeTruthy()
      await expect(span.classList.contains('text-xs')).toBeTruthy()
    })
  },
}

export const CircleBase: Story = {
  args: {
    shape: 'circle',
    size: 'base',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)

    await ctx.step('Components exists', async () => {
      const img = await canvas.findByAltText('@radix-vue')
      const span = img.parentElement as HTMLSpanElement
      await expect(img).toBeVisible()
      await expect(span.classList.contains('rounded-full')).toBeTruthy()
      await expect(span.classList.contains('size-16')).toBeTruthy()
      await expect(span.classList.contains('text-2xl')).toBeTruthy()
    })
  },
}

export const CircleLg: Story = {
  args: {
    shape: 'circle',
    size: 'lg',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)

    await ctx.step('Components exists', async () => {
      const img = await canvas.findByAltText('@radix-vue')
      const span = img.parentElement as HTMLSpanElement
      await expect(img).toBeVisible()
      await expect(span.classList.contains('rounded-full')).toBeTruthy()
      await expect(span.classList.contains('size-32')).toBeTruthy()
      await expect(span.classList.contains('text-5xl')).toBeTruthy()
    })
  },
}

export const SquareSm: Story = {
  args: {
    shape: 'square',
    size: 'sm',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)

    await ctx.step('Components exists', async () => {
      const img = await canvas.findByAltText('@radix-vue')
      const span = img.parentElement as HTMLSpanElement
      await expect(img).toBeVisible()
      await expect(span.classList.contains('rounded-md')).toBeTruthy()
      await expect(span.classList.contains('size-10')).toBeTruthy()
      await expect(span.classList.contains('text-xs')).toBeTruthy()
    })
  },
}

export const SquareBase: Story = {
  args: {
    shape: 'square',
    size: 'base',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)

    await ctx.step('Components exists', async () => {
      const img = await canvas.findByAltText('@radix-vue')
      const span = img.parentElement as HTMLSpanElement
      await expect(img).toBeVisible()
      await expect(span.classList.contains('rounded-md')).toBeTruthy()
      await expect(span.classList.contains('size-16')).toBeTruthy()
      await expect(span.classList.contains('text-2xl')).toBeTruthy()
    })
  },
}

export const SquareLg: Story = {
  args: {
    shape: 'square',
    size: 'lg',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)

    await ctx.step('Components exists', async () => {
      const img = await canvas.findByAltText('@radix-vue')
      const span = img.parentElement as HTMLSpanElement
      await expect(img).toBeVisible()
      await expect(span.classList.contains('rounded-md')).toBeTruthy()
      await expect(span.classList.contains('size-32')).toBeTruthy()
      await expect(span.classList.contains('text-5xl')).toBeTruthy()
    })
  },
}
