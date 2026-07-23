import type en from '@/locales/en'
import 'i18next'

declare module 'i18next' {
  interface CustomTypeOptions {
    defaultNS: 'translation'
    enableSelector: true
    resources: typeof en
  }
}
