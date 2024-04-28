import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from '@storybook/test'
import { Icon } from '@iconify/vue'
import Alert from './Alert.vue'
import AlertDescription from './AlertDescription.vue'
import AlertTitle from './AlertTitle.vue'

const meta = {
  title: 'UI/Alert',
  tags: ['autodocs'],
  component: Alert,
  subcomponents: { AlertTitle, AlertDescription },
  render: args => ({
    components: { Alert, AlertDescription, AlertTitle, Icon },
    setup() {
      return { args }
    },
    template: `
      <Alert v-bind="args">
        <Icon icon="lucide:terminal" class="h-4 w-4" />
        <AlertTitle>Alert Title</AlertTitle>
        <AlertDescription>Alert Description</AlertDescription>
      </Alert>
    `,
  }),
} satisfies Meta<typeof Alert>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    variant: 'default',
  },
  // see: https://storybook.js.org/docs/writing-tests/interaction-testing
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const alert = canvas.getByRole('alert')
    const title = canvas.getByText('Alert Title')
    const description = canvas.getByText('Alert Description')

    await ctx.step('Components exists', async () => {
      await expect(alert).toBeInTheDocument()
      await expect(title).toBeInTheDocument()
      await expect(description).toBeInTheDocument()
    })

    await ctx.step('Contains correct classname', async () => {
      await expect(alert.classList.contains('bg-background')).toBeTruthy()
      await expect(alert.classList.contains('text-foreground')).toBeTruthy()
    })
  },
}

export const Destructive: Story = {
  args: {
    variant: 'destructive',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const alert = canvas.getByRole('alert')
    const title = canvas.getByText('Alert Title')
    const description = canvas.getByText('Alert Description')

    await ctx.step('Components exists', async () => {
      await expect(alert).toBeInTheDocument()
      await expect(title).toBeInTheDocument()
      await expect(description).toBeInTheDocument()
    })

    await ctx.step('Contains correct classname', async () => {
      await expect(alert.classList.contains('border-destructive/50')).toBeTruthy()
      await expect(alert.classList.contains('text-destructive')).toBeTruthy()
      await expect(alert.classList.contains('[&>svg]:text-destructive')).toBeTruthy()
    })
  },
}
