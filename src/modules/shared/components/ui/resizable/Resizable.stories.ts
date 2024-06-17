import type { Meta, StoryObj } from '@storybook/vue3'
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '.'

const subcomponents = {
  ResizablePanel,
  ResizableHandle,
}

const meta = {
  title: 'UI/Resizable',
  component: ResizablePanelGroup,
  subcomponents,
} satisfies Meta<typeof ResizablePanelGroup>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    direction: 'horizontal',
  },
  render: args => ({
    components: { ResizablePanelGroup, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <ResizablePanelGroup v-bind="args">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const Vertical: Story = {
  args: {
    direction: 'vertical',
  },
  render: args => ({
    components: { ResizablePanelGroup, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <ResizablePanelGroup
        class="min-h-[200px] max-w-md rounded-lg border"
        v-bind="args"
      >
        <ResizablePanel id="vertical-demo-panel-1" :default-size="25">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Header</span>
          </div>
        </ResizablePanel>
        <ResizableHandle id="vertical-demo-handle-1" />
        <ResizablePanel id="vertical-demo-panel-2" :default-size="75">
          <div class="flex h-full items-center justify-center p-6">
            <span class="font-semibold">Content</span>
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const WithHandle: Story = {
  args: {
    direction: 'horizontal',
  },
  render: args => ({
    components: { ResizablePanelGroup, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <ResizablePanelGroup v-bind="args">
        <ResizablePanel>One</ResizablePanel>
        <ResizableHandle with-handle />
        <ResizablePanel>Two</ResizablePanel>
      </ResizablePanelGroup>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
