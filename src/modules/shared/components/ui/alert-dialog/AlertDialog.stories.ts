import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from '@storybook/test'
import { PointerEventsCheckLevel } from '@testing-library/user-event'
import AlertDialog from './AlertDialog.vue'
import AlertDialogTrigger from './AlertDialogTrigger.vue'
import AlertDialogContent from './AlertDialogContent.vue'
import AlertDialogHeader from './AlertDialogHeader.vue'
import AlertDialogTitle from './AlertDialogTitle.vue'
import AlertDialogDescription from './AlertDialogDescription.vue'
import AlertDialogFooter from './AlertDialogFooter.vue'
import AlertDialogCancel from './AlertDialogCancel.vue'
import AlertDialogAction from './AlertDialogAction.vue'

const subcomponents = {
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
}

const meta = {
  title: 'UI/AlertDialog',
  component: AlertDialog,
  subcomponents,
  render: args => ({
    components: { AlertDialog, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <AlertDialog v-bind="args">
        <AlertDialogTrigger>Open</AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    `,
  }),
} satisfies Meta<typeof AlertDialog>

export default meta
type Story = StoryObj<typeof meta>

export const DefaultClosed: Story = {
  // see: https://storybook.js.org/docs/writing-tests/interaction-testing
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const parent = within(ctx.canvasElement.parentElement as HTMLElement)
    const openButton = canvas.getByRole('button', { name: /Open/i })
    const alertDialog = parent.queryByRole('alertdialog', { name: /radix-vue/i })
    const title = /Are you absolutely sure?/i
    const description = /This action cannot be undone/i
    const cancel = /Cancel/i
    const continuee = /Continue/i

    await ctx.step('Components exists and dialog closed by default', async () => {
      await expect(openButton).toBeVisible()
      await expect(parent.queryByText(title)).not.toBeInTheDocument()
      await expect(alertDialog).toBeNull()
    })

    await ctx.step('Clicking open should open dialog and show contents', async () => {
      await userEvent.click(openButton)
      await expect(parent.getByText(title)).toBeInTheDocument()
      await expect(parent.getByText(description)).toBeInTheDocument()
      await expect(parent.getByRole('button', { name: cancel })).toBeInTheDocument()
      await expect(parent.getByRole('button', { name: continuee })).toBeInTheDocument()
    })

    await ctx.step('Clicking "Cancel" or "Continue" should close the dialog', async () => {
      await userEvent.click(parent.getByRole('button', { name: cancel }))
      await expect(alertDialog).toBeNull()
      await userEvent.click(openButton, { pointerEventsCheck: PointerEventsCheckLevel.EachTarget })
      await userEvent.click(parent.getByRole('button', { name: continuee }))
      await expect(alertDialog).toBeNull()
    })
  },
}

export const DefaultOpened: Story = {
  args: {
    defaultOpen: true,
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const parent = within(ctx.canvasElement.parentElement as HTMLElement)
    const alertDialog = parent.queryByRole('alertdialog', { name: /radix-vue/i })
    const title = /Are you absolutely sure?/i
    const description = /This action cannot be undone/i
    const cancel = /Cancel/i
    const continuee = /Continue/i

    await ctx.step('Components exists and dialog opened by default', async () => {
      await expect(canvas.queryByRole('button', { name: /Open/i })).toBeNull()
      await expect(parent.getByText(title)).toBeInTheDocument()
      await expect(parent.getByText(description)).toBeInTheDocument()
      await expect(parent.getByRole('button', { name: cancel })).toBeInTheDocument()
      await expect(parent.getByRole('button', { name: continuee })).toBeInTheDocument()
    })

    await ctx.step('Clicking "Cancel" or "Continue" should close the dialog', async () => {
      await userEvent.click(parent.getByRole('button', { name: cancel }))
      await expect(alertDialog).toBeNull()
    })
  },
}
