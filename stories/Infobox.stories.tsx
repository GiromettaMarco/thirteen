import { Infobox } from '@/components/ui/infobox'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  component: Infobox,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
} satisfies Meta<typeof Infobox>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: <p>This is an infobox with default options.</p>
  }
}

export const Success: Story = {
  args: {
    children: <p>Whatever you did was a success.</p>,
    variant: 'success'
  }
}

export const Info: Story = {
  args: {
    children: <p>Just so you know, this is some information.</p>,
    variant: 'info'
  }
}

export const Warning: Story = {
  args: {
    children: <p>Tread lightly.</p>,
    variant: 'warning'
  }
}

export const Error: Story = {
  args: {
    children: <p>This section is very dangerous.</p>,
    variant: 'error'
  }
}
