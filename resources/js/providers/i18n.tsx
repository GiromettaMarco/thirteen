import { i18n as formsI18n } from '@gmcode/forms'
import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'
import en from '@/locales/en/validations'
import it from '@/locales/it/validations'
import resources from '@/locales/resources'

// @NOTE change translations serving strategy based on the application purpose.

await i18n
  .use(initReactI18next)
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

// Setup forms i18n
formsI18n.addResourceBundle('en', 'translation', en, true)
formsI18n.addResourceBundle('it', 'translation', it, true)
void formsI18n.changeLanguage(i18n.language)
i18n.on('languageChanged', (language) => formsI18n.changeLanguage(language))

export default i18n
