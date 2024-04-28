import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, waitForElementToBeRemoved, within } from '@storybook/test'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import Button from '../button/Button.vue'
import Collapsible from './Collapsible.vue'
import CollapsibleContent from './CollapsibleContent.vue'
import CollapsibleTrigger from './CollapsibleTrigger.vue'

const subcomponents = {
  CollapsibleContent,
  CollapsibleTrigger,
}

const meta = {
  title: 'UI/Collapsible',
  tags: ['autodocs'],
  component: Collapsible,
  subcomponents,
} satisfies Meta<typeof Collapsible>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Collapsible, ...subcomponents, Icon, Button },
    setup() {
      const isOpen = ref(false)

      return { args, isOpen }
    },
    template: `
      <Collapsible v-model:open="isOpen" v-bind="args">
        <div class="flex items-center justify-between space-x-4 px-4 mb-2">
          <h4 class="text-sm font-semibold">
            @peduarte starred 3 repositories
          </h4>
          <CollapsibleTrigger as-child>
            <Button variant="ghost" size="sm" class="w-9 p-0">
              <Icon icon="lucide:chevrons-up-down" class="h-4 w-4" />
              <span class="sr-only">Toggle</span>
            </Button>
          </CollapsibleTrigger>
        </div>
        <div class="rounded-md border px-4 py-3 mb-2 font-mono text-sm">
          @radix-ui/primitives
        </div>
        <CollapsibleContent class="space-y-2">
          <div class="rounded-md border px-4 py-3 font-mono text-sm">
            @radix-ui/colors
          </div>
          <div class="rounded-md border px-4 py-3 font-mono text-sm">
            @stitches/react
          </div>
        </CollapsibleContent>
      </Collapsible>
    `,
  }),
  play: async (ctx) => {
    const user = userEvent.setup()
    const canvas = within(ctx.canvasElement)
    const button = canvas.getByRole('button', { name: /Toggle/i })

    await ctx.step('Default state contents collapsed', async () => {
      await expect(button).toBeVisible()
      await expect(canvas.queryByText('@radix-ui/colors')).toBeNull()
      await expect(canvas.queryByText('@stitches/react')).toBeNull()
    })

    await ctx.step('Expand contents', async () => {
      await user.click(button)
      await expect(await canvas.findByText('@radix-ui/colors')).toBeVisible()
      await expect(await canvas.findByText('@stitches/react')).toBeVisible()
    })

    await ctx.step('Collapse contents', async () => {
      await user.click(button)
      const colors = canvas.getByText('@radix-ui/colors')
      const stitches = canvas.getByText('@stitches/react')
      await waitForElementToBeRemoved([colors, stitches])
      await expect(colors).not.toBeInTheDocument()
      await expect(stitches).not.toBeInTheDocument()
    })
  },
}
