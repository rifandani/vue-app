import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import type { DropdownMenuCheckboxItemProps } from 'radix-vue'
import { Button } from '../button'
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuTrigger } from '.'

type Checked = DropdownMenuCheckboxItemProps['checked']

const subcomponents = { DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuSub, DropdownMenuCheckboxItem, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuItem }

const meta = {
  title: 'UI/DropdownMenu',
  tags: ['autodocs'],
  component: DropdownMenu,
  subcomponents,
} satisfies Meta<typeof DropdownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { DropdownMenu, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <DropdownMenu>
        <DropdownMenuTrigger>Open</DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>My Account</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const WithCheckboxes: Story = {
  render: args => ({
    components: { DropdownMenu, ...subcomponents, Button },
    setup() {
      const showStatusBar = ref<Checked>(true)
      const showActivityBar = ref<Checked>(false)
      const showPanel = ref<Checked>(false)

      return { args, showStatusBar, showActivityBar, showPanel }
    },
    template: `
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline">
            Open
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuLabel>Appearance</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            v-model:checked="showStatusBar"
          >
            Status Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            v-model:checked="showActivityBar"
            disabled
          >
            Activity Bar
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            v-model:checked="showPanel"
          >
            Panel
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const WithRadioGroup: Story = {
  render: args => ({
    components: { DropdownMenu, ...subcomponents, Button },
    setup() {
      const position = ref('bottom')

      return { args, position }
    },
    template: `
      <DropdownMenu>
        <DropdownMenuTrigger as-child>
          <Button variant="outline">
            Open
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent class="w-56">
          <DropdownMenuLabel>Panel Position</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup v-model="position">
            <DropdownMenuRadioItem value="top">
              Top
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="bottom">
              Bottom
            </DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="right">
              Right
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
