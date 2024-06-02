import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, userEvent, within } from '@storybook/test'
import Accordion from './Accordion.vue'
import AccordionContent from './AccordionContent.vue'
import AccordionItem from './AccordionItem.vue'
import AccordionTrigger from './AccordionTrigger.vue'

const meta = {
  title: 'UI/Accordion',
  component: Accordion,
  subcomponents: { AccordionItem, AccordionTrigger },
  render: args => ({
    components: { Accordion, AccordionContent, AccordionItem, AccordionTrigger },
    setup() {
      const defaultValue = 'item-1'

      const accordionItems = [
        { value: 'item-1', title: 'Is it accessible?', content: 'Yes. It adheres to the WAI-ARIA design pattern.' },
        { value: 'item-2', title: 'Is it unstyled?', content: 'Yes. It\'s unstyled by default, giving you freedom over the look and feel.' },
        { value: 'item-3', title: 'Can it be animated?', content: 'Yes! You can use the transition prop to configure the animation.' },
      ]

      return { args, defaultValue, accordionItems }
    },
    template: `
      <Accordion class="w-full" v-bind="args">
        <AccordionItem v-for="item in accordionItems" :key="item.value" :value="item.value">
          <AccordionTrigger>{{ item.title }}</AccordionTrigger>
          <AccordionContent>{{ item.content }}</AccordionContent>
        </AccordionItem>
      </Accordion>
    `,
  }),
} satisfies Meta<typeof Accordion>

export default meta
type Story = StoryObj<typeof meta>

export const SingleVertical: Story = {
  args: {
    collapsible: false,
    disabled: false,
    orientation: 'vertical',
    type: 'single',
  },
  // see: https://storybook.js.org/docs/writing-tests/interaction-testing
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const button1 = canvas.getByRole('button', { name: /Is it accessible?/i })
    const button2 = canvas.getByRole('button', { name: /Is it unstyled?/i })
    const button3 = canvas.getByRole('button', { name: /Can it be animated?/i })
    const content1 = /Yes. It adheres to the WAI-ARIA design pattern./i
    const content2 = /Yes. It\'s unstyled by default, giving you freedom over the look and feel./i
    const content3 = /Yes! You can use the transition prop to configure the animation./i

    await ctx.step('Components exists and collapsed by default', async () => {
      await expect(button1).toBeVisible()
      await expect(button2).toBeVisible()
      await expect(button3).toBeVisible()
      await expect(canvas.queryByText(content1)).toBeNull()
      await expect(canvas.queryByText(content2)).toBeNull()
      await expect(canvas.queryByText(content3)).toBeNull()
    })

    await ctx.step('Clicking first accordion should expand and show first content', async () => {
      await userEvent.click(button1)
      await expect(canvas.getByText(content1)).toBeVisible()
    })

    await ctx.step('Clicking second accordion should expand and show second content', async () => {
      await userEvent.click(button2)
      await expect(canvas.getByText(content2)).toBeVisible()
    })

    await ctx.step('Clicking third accordion should expand and show third content', async () => {
      await userEvent.click(button3)
      await expect(canvas.getByText(content3)).toBeVisible()
    })
  },
}

export const MultipleVertical: Story = {
  args: {
    collapsible: false,
    disabled: false,
    orientation: 'vertical',
    type: 'multiple',
  },
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const button1 = canvas.getByRole('button', { name: /Is it accessible?/i })
    const button2 = canvas.getByRole('button', { name: /Is it unstyled?/i })
    const button3 = canvas.getByRole('button', { name: /Can it be animated?/i })
    const content1 = /Yes. It adheres to the WAI-ARIA design pattern./i
    const content2 = /Yes. It\'s unstyled by default, giving you freedom over the look and feel./i
    const content3 = /Yes! You can use the transition prop to configure the animation./i

    await ctx.step('Components exists and collapsed by default', async () => {
      await expect(button1).toBeVisible()
      await expect(button2).toBeVisible()
      await expect(button3).toBeVisible()
      await expect(canvas.queryByText(content1)).toBeNull()
      await expect(canvas.queryByText(content2)).toBeNull()
      await expect(canvas.queryByText(content3)).toBeNull()
    })

    await ctx.step('Clicking first accordion should expand and show first content', async () => {
      await userEvent.click(button1)
      await expect(canvas.getByText(content1)).toBeVisible()
    })

    await ctx.step('Clicking second accordion should expand and show first and second content', async () => {
      await userEvent.click(button2)
      await expect(canvas.getByText(content1)).toBeVisible()
      await expect(canvas.getByText(content2)).toBeVisible()
    })

    await ctx.step('Clicking third accordion should expand and show all content', async () => {
      await userEvent.click(button3)
      await expect(canvas.getByText(content1)).toBeVisible()
      await expect(canvas.getByText(content2)).toBeVisible()
      await expect(canvas.getByText(content3)).toBeVisible()
    })
  },
}
