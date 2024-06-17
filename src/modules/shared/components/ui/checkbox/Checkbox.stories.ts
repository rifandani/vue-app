import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from '@storybook/test'
import Checkbox from './Checkbox.vue'

const meta = {
  title: 'UI/Checkbox',
  component: Checkbox,
} satisfies Meta<typeof Checkbox>

export default meta
type Story = StoryObj<typeof meta>

export const WithText: Story = {
  render: args => ({
    components: { Checkbox },
    setup() {
      return { args }
    },
    template: `
      <div class="items-top flex gap-x-2">
        <Checkbox id="terms1" v-bind="args" />
        <div class="grid gap-1.5 leading-none">
          <label
            for="terms1"
            class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Accept terms and conditions
          </label>
          <p class="text-sm text-muted-foreground">
            You agree to our Terms of Service and Privacy Policy.
          </p>
        </div>
      </div>
    `,
  }),
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const checkbox = canvas.getByRole('checkbox')

    await ctx.step('Check checkbox', async () => {
      await expect(checkbox).toHaveAttribute('aria-checked', 'false')
      await userEvent.click(checkbox)
      await expect(checkbox).toHaveAttribute('aria-checked', 'true')
    })

    await ctx.step('Uncheck checkbox', async () => {
      await expect(checkbox).toHaveAttribute('aria-checked', 'true')
      await userEvent.click(checkbox)
      await expect(checkbox).toHaveAttribute('aria-checked', 'false')
    })
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: args => ({
    components: { Checkbox },
    setup() {
      return { args }
    },
    template: `
      <div class="items-top flex space-x-2">
        <Checkbox id="terms1" v-bind="args" />
        <label
          for="terms2"
          class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
        >
          Accept terms and conditions
        </label>
      </div>
    `,
  }),
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const checkbox = canvas.getByRole('checkbox')

    await ctx.step('Checkbox is disabled', async () => {
      await expect(checkbox).toBeDisabled()
    })
  },
}
