import i18n from '@/providers/i18n'
import type { PropsWithChildren } from 'react'
import { I18nextProvider } from 'react-i18next'

export default function AppContainer({ children }: PropsWithChildren) {
  console.log('rendering AppContainer')

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>
}
