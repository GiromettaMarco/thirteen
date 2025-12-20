import type { FlashMessage } from '@/types'
import { toast } from 'sonner'

export function flashMessage(message: FlashMessage) {
  switch (message.level) {
    case 'success':
      toast.success(message.title, {
        description: message.description,
        classNames: {
          icon: 'text-success'
        }
      })
      break

    case 'info':
      toast.info(message.title, {
        description: message.description,
        classNames: {
          icon: 'text-info'
        }
      })
      break

    case 'warning':
      toast.warning(message.title, {
        description: message.description,
        classNames: {
          icon: 'text-warning'
        }
      })
      break

    case 'error':
      toast.error(message.title, {
        description: message.description,
        classNames: {
          icon: 'text-error'
        }
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
