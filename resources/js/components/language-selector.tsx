import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@gmcode/react-ui'
import type { i18n } from 'i18next'
import { Languages } from 'lucide-react'
import { type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { COOKIE_LOCALE } from '@/config'
import { setClientCookie } from '@/lib/utils'
import type { Locale } from '@/types'

async function changeLocale(i18n: i18n, locale: Locale) {
  await i18n
    .changeLanguage(locale)
    .then(() => setClientCookie(COOKIE_LOCALE, locale))
}

export function LanguageSelector({
  variant = 'outline'
}: {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}) {
  // i18n
  const { i18n, t } = useTranslation()

  async function languageSwitch() {
    switch (i18n.language) {
      case 'en':
        await changeLocale(i18n, 'it')
        break

      case 'it':
      default:
        await changeLocale(i18n, 'en')
        break
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={languageSwitch}
          size="icon"
          variant={variant}
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

  const tabs: { label: string; value: Locale }[] = [
    { label: langs['en'], value: 'en' },
    { label: langs['it'], value: 'it' }
  ]

  async function onValueChange(value: Locale) {
    await changeLocale(i18n, value)
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
          id="select-language"
        >
          <SelectValue placeholder={t(($) => $.language.select)}>
            <div className="flex items-center gap-2">
              <Languages />
              <span>{langs[i18n.language]}</span>
            </div>
          </SelectValue>
        </SelectTrigger>

        <SelectContent>
          {tabs.map(({ label, value }) => (
            <SelectItem
              id={`language-${value}`}
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
