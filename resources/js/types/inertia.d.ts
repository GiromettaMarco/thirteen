import type { Appearance, Auth, FlashMessage, Locale } from '@/types'

export interface SharedPageProps {
  [key: string]: unknown
  appearance: Appearance
  auth: Auth
  locale: Locale
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
