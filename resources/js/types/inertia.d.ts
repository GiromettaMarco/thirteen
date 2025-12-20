import type { FlashMessage } from '@/types'
import '@inertiajs/core'

declare module '@inertiajs/core' {
  interface InertiaConfig {
    flashDataType: {
      toast?: FlashMessage | FlashMessage[]
    }
  }
}
