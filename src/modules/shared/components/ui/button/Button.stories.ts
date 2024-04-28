import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from '@storybook/test'
import Button from './Button.vue'

const meta = {
  title: 'UI/Button',
  tags: ['autodocs'],
  component: Button,
  parameters: {
    // see: https://storybook.js.org/addons/storybook-addon-designs
    design: {
      type: 'figma',
      url: 'https://www.figma.com/file/2ZmHdwjDPmY5Ypb0HYlbhZ/%40shadcn%2Fui---Design-System-(Community)?type=design&node-id=1%3A85&mode=design&t=DIDXuKvUUjGWcaXT-1',
    },
  },
  render: args => ({
    components: { Button },
    setup() {
      return { args }
    },
    template: '<Button v-bind="args">Button</Button>',
  }),
} satisfies Meta<typeof Button>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
  },
  // see: https://storybook.js.org/docs/writing-tests/interaction-testing
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const button = canvas.getByRole('button', { name: /Button/i })

    await ctx.step('Components exists', async () => {
      await expect(button).toBeInTheDocument()
    })

    await ctx.step('Contains correct classname', async () => {
      await expect(button.classList.contains('bg-primary')).toBeTruthy()
      await expect(button.classList.contains('text-primary-foreground')).toBeTruthy()
    })

    await ctx.step('Clickable', async () => {
      await userEvent.click(button)
    })
  },
}

export const Secondary: Story = {
  args: {
    variant: 'secondary',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const button = canvas.getByRole('button', { name: /Button/i })

    await ctx.step('Components exists', async () => {
      await expect(button).toBeInTheDocument()
    })

    await ctx.step('Contains correct classname', async () => {
      await expect(button.classList.contains('bg-secondary')).toBeTruthy()
      await expect(button.classList.contains('text-secondary-foreground')).toBeTruthy()
    })

    await ctx.step('Clickable', async () => {
      await userEvent.click(button)
    })
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const button = canvas.getByRole('button', { name: /Button/i })

    await ctx.step('Components exists', async () => {
      await expect(button).toBeInTheDocument()
    })

    await ctx.step('Contains correct classname', async () => {
      await expect(button.classList.contains('bg-destructive')).toBeTruthy()
      await expect(button.classList.contains('text-destructive-foreground')).toBeTruthy()
    })

    await ctx.step('Clickable', async () => {
      await userEvent.click(button)
    })
  },
}

export const Outline: Story = {
  args: {
    variant: 'outline',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const button = canvas.getByRole('button', { name: /Button/i })

    await ctx.step('Components exists', async () => {
      await expect(button).toBeInTheDocument()
    })

    await ctx.step('Contains correct classname', async () => {
      await expect(button.classList.contains('bg-background')).toBeTruthy()
      await expect(button.classList.contains('border')).toBeTruthy()
      await expect(button.classList.contains('border-input')).toBeTruthy()
    })

    await ctx.step('Clickable', async () => {
      await userEvent.click(button)
    })
  },
}

export const Ghost: Story = {
  args: {
    variant: 'ghost',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const button = canvas.getByRole('button', { name: /Button/i })

    await ctx.step('Components exists', async () => {
      await expect(button).toBeInTheDocument()
    })

    await ctx.step('Contains correct classname', async () => {
      await expect(button.classList.contains('hover:text-accent-foreground')).toBeTruthy()
      await expect(button.classList.contains('hover:bg-accent')).toBeTruthy()
    })

    await ctx.step('Clickable', async () => {
      await userEvent.click(button)
    })
  },
}

export const Link: Story = {
  args: {
    variant: 'link',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const button = canvas.getByRole('button', { name: /Button/i })

    await ctx.step('Components exists', async () => {
      await expect(button).toBeInTheDocument()
    })

    await ctx.step('Contains correct classname', async () => {
      await expect(button.classList.contains('text-primary')).toBeTruthy()
      await expect(button.classList.contains('underline-offset-4')).toBeTruthy()
    })

    await ctx.step('Clickable', async () => {
      await userEvent.click(button)
    })
  },
}
