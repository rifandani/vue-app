import type { Meta, StoryObj } from '@storybook/vue3'
import ContextMenu from './ContextMenu.vue'
import ContextMenuCheckboxItem from './ContextMenuCheckboxItem.vue'
import ContextMenuContent from './ContextMenuContent.vue'
import ContextMenuGroup from './ContextMenuGroup.vue'
import ContextMenuItem from './ContextMenuItem.vue'
import ContextMenuLabel from './ContextMenuLabel.vue'
import ContextMenuPortal from './ContextMenuPortal.vue'
import ContextMenuRadioGroup from './ContextMenuRadioGroup.vue'
import ContextMenuRadioItem from './ContextMenuRadioItem.vue'
import ContextMenuSeparator from './ContextMenuSeparator.vue'
import ContextMenuShortcut from './ContextMenuShortcut.vue'
import ContextMenuSub from './ContextMenuSub.vue'

const subcomponents = {
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
}

const meta = {
  title: 'UI/ContextMenu',
  component: ContextMenu,
  subcomponents,
} satisfies Meta<typeof ContextMenu>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { ContextMenu, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <ContextMenu v-bind="args">
        <ContextMenuTrigger class="flex h-[150px] w-[300px] items-center justify-center rounded-md border border-dashed text-sm">
          Right click here
        </ContextMenuTrigger>
        <ContextMenuContent class="w-64">
          <ContextMenuItem inset>
            Back
            <ContextMenuShortcut>⌘[</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset disabled>
            Forward
            <ContextMenuShortcut>⌘]</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuItem inset>
            Reload
            <ContextMenuShortcut>⌘R</ContextMenuShortcut>
          </ContextMenuItem>
          <ContextMenuSub>
            <ContextMenuSubTrigger inset>
              More Tools
            </ContextMenuSubTrigger>
            <ContextMenuSubContent class="w-48">
              <ContextMenuItem>
                Save Page As...
                <ContextMenuShortcut>⇧⌘S</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>Create Shortcut...</ContextMenuItem>
              <ContextMenuItem>Name Window...</ContextMenuItem>
              <ContextMenuSeparator />
              <ContextMenuItem>Developer Tools</ContextMenuItem>
            </ContextMenuSubContent>
          </ContextMenuSub>
          <ContextMenuSeparator />
          <ContextMenuCheckboxItem checked>
            Show Bookmarks Bar
            <ContextMenuShortcut>⌘⇧B</ContextMenuShortcut>
          </ContextMenuCheckboxItem>
          <ContextMenuCheckboxItem>Show Full URLs</ContextMenuCheckboxItem>
          <ContextMenuSeparator />
          <ContextMenuRadioGroup model-value="pedro">
            <ContextMenuLabel inset>
              People
            </ContextMenuLabel>
            <ContextMenuSeparator />
            <ContextMenuRadioItem value="pedro">
              Pedro Duarte
            </ContextMenuRadioItem>
            <ContextMenuRadioItem value="colm">
              Colm Tuite
            </ContextMenuRadioItem>
          </ContextMenuRadioGroup>
        </ContextMenuContent>
      </ContextMenu>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
