import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { TagsInput, TagsInputInput, TagsInputItem, TagsInputItemDelete, TagsInputItemText } from '.'

const subcomponents = {
  TagsInputInput,
  TagsInputItem,
  TagsInputItemDelete,
  TagsInputItemText,
}

const meta = {
  title: 'UI/TagsInput',
  component: TagsInput,
  subcomponents,
} satisfies Meta<typeof TagsInput>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { TagsInput, ...subcomponents },
    setup() {
      const modelValue = ref(['Apple', 'Banana'])

      return { args, modelValue }
    },
    template: `
      <TagsInput v-model="modelValue" v-bind="args">
        <TagsInputItem v-for="item in modelValue" :key="item" :value="item">
          <TagsInputItemText />
          <TagsInputItemDelete />
        </TagsInputItem>

        <TagsInputInput placeholder="Fruits..." />
      </TagsInput>
    `,
  }),
  // play: async (ctx) => {
  //   const user = userEvent.setup()
  //   const canvas = within(ctx.canvasElement)
  // },
}
