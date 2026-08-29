import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import resources from '@/locales/resources'

// @NOTE change translations serving strategy based on the application purpose.

await i18n
  .use(initReactI18next) // @TODO remove this?
  .use(LanguageDetector)
  .init({
    detection: {
      caches: [],
      order: ['htmlTag']
    },
    fallbackLng: 'en',
    resources,
    supportedLngs: ['en', 'it']
  })

export default i18n
