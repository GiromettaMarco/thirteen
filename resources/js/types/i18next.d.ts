import type en from '@/locales/en'
import 'i18next'

declare module 'i18next' {
  interface CustomTypeOptions {
    enableSelector: true
    defaultNS: 'translation'
    resources: typeof en
  }
}
