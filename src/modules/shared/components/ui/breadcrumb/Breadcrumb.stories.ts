import type { Meta, StoryObj } from '@storybook/vue3'
import { expect, within } from '@storybook/test'
import { Icon } from '@iconify/vue'
import Breadcrumb from './Breadcrumb.vue'
import BreadcrumbEllipsis from './BreadcrumbEllipsis.vue'
import BreadcrumbItem from './BreadcrumbItem.vue'
import BreadcrumbLink from './BreadcrumbLink.vue'
import BreadcrumbList from './BreadcrumbList.vue'
import BreadcrumbPage from './BreadcrumbPage.vue'
import BreadcrumbSeparator from './BreadcrumbSeparator.vue'

const subcomponents = {
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
}

const meta = {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
  subcomponents,
} satisfies Meta<typeof Breadcrumb>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: args => ({
    components: { Breadcrumb, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <Breadcrumb v-bind="args">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbLink href="#components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator/>
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    `,
  }),
  // see: https://storybook.js.org/docs/writing-tests/interaction-testing
  play: async (ctx) => {
    const canvas = within(ctx.canvasElement)
    const list = canvas.getByRole('list')

    await ctx.step('Components exists', async () => {
      await expect(list.children).toHaveLength(5)
      await expect(list.children.item(0)).toHaveTextContent('Home')
      await expect(list.children.item(2)).toHaveTextContent('Components')
      await expect(list.children.item(4)).toHaveTextContent('Breadcrumb')
    })
  },
}

export const CustomSeparator: Story = {
  render: args => ({
    components: { Breadcrumb, ...subcomponents, Icon },
    setup() {
      return { args }
    },
    template: `
      <Breadcrumb v-bind="args">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Icon icon="lucide:slash" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="#components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Icon icon="lucide:slash" />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    `,
  }),
}

export const WithEllipsis: Story = {
  render: args => ({
    components: { Breadcrumb, ...subcomponents },
    setup() {
      return { args }
    },
    template: `
      <Breadcrumb v-bind="args">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbEllipsis />
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#components">Components</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Breadcrumb</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
    `,
  }),
}
