import LoginPage from '@/pages/auth/login'
import type { Meta, StoryObj } from '@storybook/react-vite'

const meta = {
  args: {
    canRegister: true,
    canReset: true
  },
  component: LoginPage,
  parameters: {
    layout: 'fullscreen'
  },
  tags: ['autodocs']
} satisfies Meta<typeof LoginPage>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
