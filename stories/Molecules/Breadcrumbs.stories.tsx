import type { Meta, StoryObj } from '@storybook/react-vite'
import { Breadcrumbs } from '@/components/breadcrumbs'

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
      { href: '/dashboard', key: 1, label: 'dashboard' },
      { href: '/teams', key: 2, label: 'teams' }
    ]
  }
}
