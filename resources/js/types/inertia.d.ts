import type { Appearance, Auth, FlashMessage } from '@/types'

declare module '@inertiajs/core' {
  interface InertiaConfig {
    flashDataType: {
      toast?: FlashMessage | FlashMessage[]
    }
    sharedPageProps: {
      appearance: Appearance
      auth: Auth
      sidebarOpen: boolean
    }
  }
}
