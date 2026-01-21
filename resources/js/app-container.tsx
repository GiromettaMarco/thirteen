import AppContextProvider from '@/providers/app-context-provider'
import AppearanceProvider from '@/providers/appearance-provider'
import FlashNotifications from '@/providers/flash-notifications'
import i18n from '@/providers/i18n'
import type { Appearance } from '@/types'
import type { PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'

export default function AppContainer({
  appearance,
  children
}: PropsWithChildren<{ appearance: Appearance }>) {
  return (
    <I18nextProvider i18n={i18n}>
      <AppearanceProvider appearance={appearance}>
        <FlashNotifications />

        <AppContextProvider>{children}</AppContextProvider>
      </AppearanceProvider>
    </I18nextProvider>
  )
}
