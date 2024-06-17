import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from '@storybook/test'
import Badge from './Badge.vue'

const meta = {
  title: 'UI/Badge',
  component: Badge,
  render: args => ({
    components: { Badge },
    setup() {
      return { args }
    },
    template: '<Badge v-bind="args">Badge</Badge>',
  }),
} satisfies Meta<typeof Badge>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
  },
  // see: https://storybook.js.org/docs/writing-tests/interaction-testing
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const badge = canvas.getByText('Badge')

    await ctx.step('Components exists', async () => {
      await expect(badge).toBeInTheDocument()
    })

    await ctx.step('Contains correct classname', async () => {
      await expect(badge.classList.contains('bg-primary')).toBeTruthy()
      await expect(badge.classList.contains('text-primary-foreground')).toBeTruthy()
    })
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const badge = canvas.getByText('Badge')

    await ctx.step('Components exists', async () => {
      await expect(badge).toBeInTheDocument()
    })

    await ctx.step('Contains correct classname', async () => {
      await expect(badge.classList.contains('bg-secondary')).toBeTruthy()
      await expect(badge.classList.contains('text-secondary-foreground')).toBeTruthy()
    })
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const badge = canvas.getByText('Badge')

    await ctx.step('Components exists', async () => {
      await expect(badge).toBeInTheDocument()
    })

    await ctx.step('Contains correct classname', async () => {
      await expect(badge.classList.contains('bg-destructive')).toBeTruthy()
      await expect(badge.classList.contains('text-destructive-foreground')).toBeTruthy()
    })
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const badge = canvas.getByText('Badge')

    await ctx.step('Components exists', async () => {
      await expect(badge).toBeInTheDocument()
    })

    await ctx.step('Contains correct classname', async () => {
      await expect(badge.classList.contains('text-foreground')).toBeTruthy()
    })
  },
}
