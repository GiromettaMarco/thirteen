import { Button } from '@/components/ui/button'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { Menu } from 'lucide-react'

const meta = {
  component: Button,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'radio',
      options: ['default', 'sm', 'lg', 'icon', 'icon-sm', 'icon-lg']
    },
    variant: {
      control: 'radio',
      options: [
        'default',
        'secondary',
        'link',
        'outline',
        'ghost',
        'destructive'
      ]
    }
  }
} satisfies Meta<typeof Button>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Click Me'
  }
}

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <Menu />
        <span className="sr-only">open menu</span>
      </>
    ),
    size: 'icon'
  }
}

export const Delete: Story = {
  args: {
    children: 'Delete',
    variant: 'destructive'
  }
}

export const AsChild: Story = {
  args: {
    asChild: true,
    children: (
      <a
        href="https://storybook.js.org/"
        target="_blank"
      >
        Storybook
      </a>
    ),
    variant: 'link'
  }
}
