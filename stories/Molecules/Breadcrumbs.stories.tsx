import { Breadcrumbs } from '@/components/breadcrumbs'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Breadcrumbs,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Breadcrumbs>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    links: [
      { key: 1, href: '/dashboard', label: 'dashboard' },
      { key: 2, href: '/teams', label: 'teams' }
    ]
  }
}
