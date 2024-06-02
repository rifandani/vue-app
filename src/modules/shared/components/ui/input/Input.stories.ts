import type { Meta, StoryObj } from '@storybook/vue3'
import { Icon } from '@iconify/vue'
import { Button } from '../button'
import { Label } from '../label'
import { Input } from '.'

const meta = {
  title: 'UI/Input',
  component: Input,
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Input },
    setup() {
      return { args }
    },
    template: `
      <Input id="email" type="email" placeholder="Email" v-bind="args" />
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const Disabled: Story = {
  render: args => ({
    components: { Input },
    setup() {
      return { args }
    },
    template: `
      <Input id="email" type="email" placeholder="Email" disabled v-bind="args" />
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const WithIcon: Story = {
  render: args => ({
    components: { Input, Icon },
    setup() {
      return { args }
    },
    template: `
      <div class="relative w-full max-w-sm items-center">
        <Input id="search" type="text" placeholder="Search..." class="pl-10" />
        <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
          <Icon icon="lucide:search" class="size-6 text-muted-foreground" v-bind="args" />
        </span>
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const WithButton: Story = {
  render: args => ({
    components: { Input, Button },
    setup() {
      return { args }
    },
    template: `
      <div class="flex w-full max-w-sm items-center gap-1.5">
        <Input id="email" type="email" placeholder="Email" v-bind="args" />
        <Button type="submit">
          Subscribe
        </Button>
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const FileWithLabel: Story = {
  render: args => ({
    components: { Input, Label },
    setup() {
      return { args }
    },
    template: `
      <div class="grid w-full max-w-sm items-center gap-1.5">
        <Label for="picture">Picture</Label>
        <Input id="picture" type="file" v-bind="args" />
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
