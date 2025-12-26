import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { setClientCookie } from '@/lib/cookie'
import type { Locale } from '@/types'
import type { Callback, TFunction } from 'i18next'
import { Globe } from 'lucide-react'
import { type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

function changeLocale(
  changeLanguage: (lng?: string, callback?: Callback) => Promise<TFunction>,
  locale: Locale
) {
  changeLanguage(locale)

  setClientCookie(import.meta.env.VITE_COOKIE_LOCALE, locale)
}

export function LanguageSelector({
  variant = 'outline'
}: {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}) {
  // i18n
  const { i18n, t } = useTranslation()

  function languageSwitch() {
    switch (i18n.language) {
      case 'en':
        changeLocale(i18n.changeLanguage, 'it')
        break

      case 'it':
      default:
        changeLocale(i18n.changeLanguage, 'en')
        break
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          onClick={languageSwitch}
        >
          <span className="uppercase">{i18n.language}</span>
          <span className="sr-only">{t(($) => $.language.change)}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{t(($) => $.language.change)}</span>
      </TooltipContent>
    </Tooltip>
  )
}

export function LanguageSelect(props: ComponentProps<'div'>) {
  // i18n
  const { i18n, t } = useTranslation()

  const langs: Record<string, string> = {
    en: 'English - EN',
    it: 'Italiano - IT'
  }

  const tabs: { value: Locale; label: string }[] = [
    { value: 'en', label: langs['en'] },
    { value: 'it', label: langs['it'] }
  ]

  function onValueChange(value: Locale) {
    changeLocale(i18n.changeLanguage, value)
  }

  return (
    <div {...props}>
      <Select
        onValueChange={onValueChange}
        value={i18n.language}
      >
        <SelectTrigger
          aria-label={t(($) => $.language.select)}
          className="w-full"
        >
          <SelectValue placeholder={t(($) => $.language.select)}>
            <div className="flex items-center gap-2">
              <Globe />
              <span>{langs[i18n.language]}</span>
            </div>
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {tabs.map(({ value, label }) => (
            <SelectItem
              key={value}
              value={value}
            >
              <div className="flex items-center gap-2">
                <span>{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
