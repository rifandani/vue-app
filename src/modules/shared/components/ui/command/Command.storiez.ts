import type { Meta, StoryObj } from '@storybook/vue3'
import { Icon } from '@iconify/vue'
import Command from './Command.vue'
import CommandDialog from './CommandDialog.vue'
import CommandEmpty from './CommandEmpty.vue'
import CommandGroup from './CommandGroup.vue'
import CommandInput from './CommandInput.vue'
import CommandItem from './CommandItem.vue'
import CommandList from './CommandList.vue'
import CommandSeparator from './CommandSeparator.vue'
import CommandShortcut from './CommandShortcut.vue'

const subcomponents = {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
}

const meta = {
  title: 'UI/Command',
  tags: ['autodocs'],
  component: Command,
  subcomponents,
} satisfies Meta<typeof Command>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Command, ...subcomponents, Icon },
    setup() {
      return { args }
    },
    template: `
      <Command class="rounded-lg border shadow-md max-w-[450px]" v-bind="args">
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Suggestions">
            <CommandItem value="Calendar">
              <Icon icon="lucide:calendar" class="mr-2 h-4 w-4" />
              <span>Calendar</span>
            </CommandItem>
            <CommandItem value="Search Emoji">
              <Icon icon="lucide:smile" class="mr-2 h-4 w-4" />
              <span>Search Emoji</span>
            </CommandItem>
          </CommandGroup>
          <CommandSeparator />
          <CommandGroup heading="Settings">
            <CommandItem value="Profile">
              <Icon icon="lucide:user" class="mr-2 h-4 w-4" />
              <span>Profile</span>
              <CommandShortcut>⌘P</CommandShortcut>
            </CommandItem>
            <CommandItem value="Settings">
              <Icon icon="lucide:settings" class="mr-2 h-4 w-4" />
              <span>Settings</span>
              <CommandShortcut>⌘S</CommandShortcut>
            </CommandItem>
          </CommandGroup>
        </CommandList>
      </Command>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

// export const WithDialog: Story = {
//   render: args => ({
//     components: { Command, ...subcomponents },
//     setup() {
//       const open = ref(false)

//       const { Meta_J, Ctrl_J } = useMagicKeys({
//         passive: false,
//         onEventFired(evt) {
//           if (evt.key === 'j' && (evt.metaKey || evt.ctrlKey))
//             evt.preventDefault()
//         },
//       })

//       watch([Meta_J, Ctrl_J], (v) => {
//         if (v[0] || v[1])
//           handleOpenChange()
//       })

//       function handleOpenChange() {
//         open.value = !open.value
//       }

//       return { args, open, handleOpenChange }
//     },
//     template: `
//       <div>
//         <p class="text-sm text-muted-foreground">
//           Press
//           <kbd
//             class="pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100"
//           >
//             <span class="text-xs">⌘</span>J
//           </kbd>
//         </p>
//         <CommandDialog v-model:open="open">
//           <CommandInput placeholder="Type a command or search..." />
//           <CommandList>
//             <CommandEmpty>No results found.</CommandEmpty>
//             <CommandGroup heading="Suggestions">
//               <CommandItem value="calendar">
//                 Calendar
//               </CommandItem>
//               <CommandItem value="search-emoji">
//                 Search Emoji
//               </CommandItem>
//               <CommandItem value="calculator">
//                 Calculator
//               </CommandItem>
//             </CommandGroup>
//             <CommandSeparator />
//             <CommandGroup heading="Settings">
//               <CommandItem value="profile">
//                 Profile
//               </CommandItem>
//               <CommandItem value="billing">
//                 Billing
//               </CommandItem>
//               <CommandItem value="settings">
//                 Settings
//               </CommandItem>
//             </CommandGroup>
//           </CommandList>
//         </CommandDialog>
//       </div>
//     `,
//   }),
//   // play: async (ctx) => {
//   //   const user = userEvent.setup()
//   //   const canvas = within(ctx.canvasElement)
//   // },
// }
