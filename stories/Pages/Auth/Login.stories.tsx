import LoginPage from '@/pages/auth/login'
import type { Meta, StoryObj } from '@storybook/react-vite'
import { getHandlers, loginFail, loginSuccess } from '../../../.storybook/msw'

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

export const Default: Story = {
  parameters: {
    msw: {
      handlers: getHandlers(loginSuccess)
    }
  }
}

export const Fail: Story = {
  parameters: {
    msw: {
      handlers: getHandlers(loginFail)
    }
  }
}
