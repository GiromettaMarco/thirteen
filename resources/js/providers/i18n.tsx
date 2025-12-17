import resources from '@/locales/resources'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languageDetector'
import { initReactI18next } from 'react-i18next'

// @NOTE change translations serving strategy based on the application purpose.

i18n
  .use(initReactI18next)
  .use(LanguageDetector)
  .init({
    fallbackLng: 'en',
    detection: {
      caches: [],
      order: ['htmlTag']
    },
    resources,
    supportedLngs: ['en', 'it']
  })

export default i18n
