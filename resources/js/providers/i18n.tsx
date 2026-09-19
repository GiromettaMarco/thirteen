import i18n from 'i18next'
import { supportedLocales } from '@/config'
import resources from '@/locales/resources'

// @NOTE change translations serving strategy based on the application purpose.

await i18n.init({
  fallbackLng: 'en',
  resources,
  supportedLngs: supportedLocales
})

export default i18n
