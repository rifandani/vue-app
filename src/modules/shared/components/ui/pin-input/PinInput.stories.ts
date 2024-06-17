import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { PinInput, PinInputGroup, PinInputInput, PinInputSeparator } from '.'

const subcomponents = {
  PinInputInput,
  PinInputGroup,
  PinInputSeparator,
}

const meta = {
  title: 'UI/PinInput',
  component: PinInput,
  subcomponents,
} satisfies Meta<typeof PinInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { PinInput, ...subcomponents },
    setup() {
      const value = ref<string[]>(['1', '2', '3'])
      // eslint-disable-next-line no-console
      const handleComplete = (e: string[]) => console.log(e.join(''))

      return { args, value, handleComplete }
    },
    template: `
      <div>
        <PinInput
          id="pin-input"
          v-model="value"
          placeholder="○"
          @complete="handleComplete"
          v-bind="args"
        >
          <PinInputGroup>
            <PinInputInput
              v-for="(id, index) in 5"
              :key="id"
              :index="index"
            />
          </PinInputGroup>
        </PinInput>
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const Disabled: Story = {
  render: args => ({
    components: { PinInput, ...subcomponents },
    setup() {
      const value = ref<string[]>(['1', '2', '3'])

      return { args, value }
    },
    template: `
      <div>
        <PinInput
          id="pin-input"
          v-model="value"
          placeholder="○"
          disabled
          v-bind="args"
        >
          <PinInputGroup>
            <PinInputInput
              v-for="(id, index) in 5"
              :key="id"
              :index="index"
            />
          </PinInputGroup>
        </PinInput>
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}

export const Separator: Story = {
  render: args => ({
    components: { PinInput, ...subcomponents },
    setup() {
      const value = ref<string[]>(['1', '2', '3'])
      // eslint-disable-next-line no-console
      const handleComplete = (e: string[]) => console.log(e.join(''))

      return { args, value, handleComplete }
    },
    template: `
      <div>
        <PinInput
          id="pin-input"
          v-model="value"
          placeholder="○"
          @complete="handleComplete"
          v-bind="args"
        >
          <PinInputGroup class="gap-1">
            <template v-for="(id, index) in 5" :key="id">
              <PinInputInput
                class="rounded-md border"
                :index="index"
              />
              <template v-if="index !== 4">
                <PinInputSeparator />
              </template>
            </template>
          </PinInputGroup>
        </PinInput>
      </div>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
