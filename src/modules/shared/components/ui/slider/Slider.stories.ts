import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { Slider } from '.'

const meta = {
  title: 'UI/Slider',
  component: Slider,
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Slider },
    setup() {
      const modelValue = ref([50])

      return { args, modelValue }
    },
    template: `
      <Slider
        v-model="modelValue"
        :max="100"
        :step="1"
        :class="w-3/5"
        v-bind="args"
      />
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
