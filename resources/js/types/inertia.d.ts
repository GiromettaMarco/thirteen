import type { Appearance, Auth, FlashMessage } from '@/types'

export interface SharedPageProps {
  appearance: Appearance
  auth: Auth
  sidebarOpen: boolean
  [key: string]: unknown
}

declare module '@inertiajs/core' {
  interface InertiaConfig {
    flashDataType: {
      toast?: FlashMessage | FlashMessage[]
    }
    sharedPageProps: SharedPageProps
  }
}
