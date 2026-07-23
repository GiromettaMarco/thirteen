import type { Appearance, Auth, FlashMessage } from '@/types'

export interface SharedPageProps {
  [key: string]: unknown
  appearance: Appearance
  auth: Auth
  sidebarOpen: boolean
}

declare module '@inertiajs/core' {
  interface InertiaConfig {
    flashDataType: {
      toast?: FlashMessage | FlashMessage[]
    }
    sharedPageProps: SharedPageProps
  }
}
