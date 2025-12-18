import type en from '@/locales/en'

declare module 'i18next' {
  interface CustomTypeOptions {
    enableSelector: true
    defaultNS: 'translation'
    resources: typeof en
  }
}
