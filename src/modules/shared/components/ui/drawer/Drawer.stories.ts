import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { Icon } from '@iconify/vue'
import { useMediaQuery } from '@vueuse/core'
import { Button } from '../button'
import { Label } from '../label'
import { Input } from '../input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../dialog'
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from '.'

const subcomponents = { DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTrigger, DrawerClose, DrawerTitle }

const meta = {
  title: 'UI/Drawer',
  tags: ['autodocs'],
  component: Drawer,
  subcomponents,
} satisfies Meta<typeof Drawer>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Drawer, ...subcomponents, Button },
    setup() {
      return { args }
    },
    template: `
      <Drawer v-bind="args">
        <DrawerTrigger>Open</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Are you absolutely sure?</DrawerTitle>
            <DrawerDescription>This action cannot be undone.</DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button>Submit</Button>
            <DrawerClose>
              <Button variant="outline" class="w-full">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const WithResponsiveDialog: Story = {
  render: args => ({
    components: { Drawer, ...subcomponents, Icon, Button, Label, Input, Dialog, DialogContent, DialogDescription, DialogTitle, DialogHeader, DialogTrigger },
    setup() {
      // Reuse `form` section
      const isDesktop = useMediaQuery('(min-width: 768px)')
      const isOpen = ref(false)

      return { args, isDesktop, isOpen }
    },
    template: `
      <Dialog v-if="isDesktop" v-model:open="isOpen">
        <DialogTrigger as-child>
          <Button variant="outline">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <form class="grid items-start gap-4 px-4">
            <div class="grid gap-2">
              <Label html-for="email">Email</Label>
              <Input id="email" type="email" default-value="shadcn@example.com" />
            </div>
            <div class="grid gap-2">
              <Label html-for="username">Username</Label>
              <Input id="username" default-value="@shadcn" />
            </div>
            <Button type="submit">
              Save changes
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      <Drawer v-else v-model:open="isOpen">
        <DrawerTrigger as-child>
          <Button variant="outline">
            Edit Profile
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader class="text-left">
            <DrawerTitle>Edit profile</DrawerTitle>
            <DrawerDescription>
              Make changes to your profile here. Click save when you're done.
            </DrawerDescription>
          </DrawerHeader>
          <form class="grid items-start gap-4 px-4">
            <div class="grid gap-2">
              <Label html-for="email">Email</Label>
              <Input id="email" type="email" default-value="shadcn@example.com" />
            </div>
            <div class="grid gap-2">
              <Label html-for="username">Username</Label>
              <Input id="username" default-value="@shadcn" />
            </div>
            <Button type="submit">
              Save changes
            </Button>
          </form>
          <DrawerFooter class="pt-2">
            <DrawerClose as-child>
              <Button variant="outline">
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
