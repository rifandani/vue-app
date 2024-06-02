import type { Meta, StoryObj } from '@storybook/vue3'
import { Icon } from '@iconify/vue'
import { ToggleGroup, ToggleGroupItem } from '.'

const subcomponents = {
  ToggleGroupItem,
}

const meta = {
  title: 'UI/ToggleGroup',
  component: ToggleGroup,
  subcomponents,
} satisfies Meta<typeof ToggleGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { ToggleGroup, ...subcomponents, Icon },
    setup() {
      return { args }
    },
    template: `
      <ToggleGroup type="multiple" v-bind="args">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Icon icon="lucide:bold" class="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Icon icon="lucide:italic" class="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Icon icon="lucide:underline" class="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const SingleSelection: Story = {
  render: args => ({
    components: { ToggleGroup, ...subcomponents, Icon },
    setup() {
      return { args }
    },
    template: `
      <ToggleGroup type="single" v-bind="args">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Icon icon="lucide:bold" class="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Icon icon="lucide:italic" class="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Icon icon="lucide:underline" class="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const Disabled: Story = {
  render: args => ({
    components: { ToggleGroup, ...subcomponents, Icon },
    setup() {
      return { args }
    },
    template: `
      <ToggleGroup type="multiple" disabled v-bind="args">
        <ToggleGroupItem value="bold" aria-label="Toggle bold">
          <Icon icon="lucide:bold" class="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="italic" aria-label="Toggle italic">
          <Icon icon="lucide:italic" class="h-4 w-4" />
        </ToggleGroupItem>
        <ToggleGroupItem value="underline" aria-label="Toggle underline">
          <Icon icon="lucide:underline" class="h-4 w-4" />
        </ToggleGroupItem>
      </ToggleGroup>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
