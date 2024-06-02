import type { Meta, StoryObj } from '@storybook/vue3'
import Button from '../button/Button.vue'
import Label from '../label/Label.vue'
import Input from '../input/Input.vue'
import Dialog from './Dialog.vue'
import DialogClose from './DialogClose.vue'
import DialogContent from './DialogContent.vue'
import DialogDescription from './DialogDescription.vue'
import DialogFooter from './DialogFooter.vue'
import DialogHeader from './DialogHeader.vue'
import DialogScrollContent from './DialogScrollContent.vue'
import DialogTitle from './DialogTitle.vue'
import DialogTrigger from './DialogTrigger.vue'

const subcomponents = {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogScrollContent,
  DialogTitle,
  DialogTrigger,
}

const meta = {
  title: 'UI/Dialog',
  component: Dialog,
  subcomponents,
} satisfies Meta<typeof Dialog>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Dialog, ...subcomponents, Button, Label, Input },
    setup() {
      return { args }
    },
    template: `
      <Dialog v-bind="args">
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
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" class="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <Button type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const WithCustomClose: Story = {
  render: args => ({
    components: { Dialog, ...subcomponents, Button, Label, Input },
    setup() {
      return { args }
    },
    template: `
      <Dialog v-bind="args">
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
          <div class="grid gap-4 py-4">
            <div class="grid grid-cols-4 items-center gap-4">
              <Label for="name" class="text-right">
                Name
              </Label>
              <Input id="name" value="Pedro Duarte" class="col-span-3" />
            </div>
          </div>
          <DialogFooter>
            <DialogClose as-child>
              <Button type="button" variant="secondary">
                Save Changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const WithScrollBody: Story = {
  render: args => ({
    components: { Dialog, ...subcomponents, Button, Label, Input },
    setup() {
      return { args }
    },
    template: `
      <Dialog v-bind="args">
        <DialogTrigger as-child>
          <Button variant="outline">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogContent class="sm:max-w-[425px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh]">
          <DialogHeader class="p-6 pb-0">
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4 overflow-y-auto px-6">
            <div class="flex flex-col justify-between h-[300dvh]">
              <p>
                This is some placeholder content to show the scrolling behavior for modals. We use repeated line breaks to demonstrate how content can exceed minimum inner height, thereby showing inner scrolling. When content becomes longer than the predefined max-height of modal, content will be cropped and scrollable within the modal.
              </p>
              <p>This content should appear at the bottom after you scroll.</p>
            </div>
          </div>
          <DialogFooter class="p-6 pt-0">
            <Button type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const WithScrollOverlay: Story = {
  render: args => ({
    components: { Dialog, ...subcomponents, Button, Label, Input },
    setup() {
      return { args }
    },
    template: `
      <Dialog>
        <DialogTrigger as-child>
          <Button variant="outline">
            Edit Profile
          </Button>
        </DialogTrigger>
        <DialogScrollContent class="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Modal title</DialogTitle>
            <DialogDescription>
              Here is modal with overlay scroll
            </DialogDescription>
          </DialogHeader>
          <div class="grid gap-4 py-4 h-[300dvh]">
            <p>
              This is some placeholder content to show the scrolling behavior for modals. Instead of repeating the text in the modal, we use an inline style to set a minimum height, thereby extending the length of the overall modal and demonstrating the overflow scrolling. When content becomes longer than the height of the viewport, scrolling will move the modal as needed.
            </p>
          </div>
          <DialogFooter>
            <Button type="submit">
              Save changes
            </Button>
          </DialogFooter>
        </DialogScrollContent>
      </Dialog>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
