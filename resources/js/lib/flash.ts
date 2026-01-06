import type { FlashMessage } from '@/types'
import { toast } from 'sonner'

export function flashMessage(message: FlashMessage) {
  switch (message.level) {
    case 'success':
      toast.success(message.title, {
        classNames: { icon: 'text-success' },
        description: message.description
      })
      break

    case 'info':
      toast.info(message.title, {
        classNames: { icon: 'text-info' },
        description: message.description
      })
      break

    case 'warning':
      toast.warning(message.title, {
        classNames: { icon: 'text-warning' },
        description: message.description
      })
      break

    case 'error':
      toast.error(message.title, {
        classNames: { icon: 'text-error' },
        description: message.description
      })
      break

    default:
      toast(message.title, { description: message.description })
      break
  }
}

export function flashMessages(messages?: FlashMessage | FlashMessage[]) {
  // undefined
  if (!messages) {
    return
  }

  // array
  if (Array.isArray(messages)) {
    messages.forEach((message) => {
      flashMessage(message)
    })

    return
  }

  // single
  flashMessage(messages)
}
