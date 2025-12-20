import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { isAppearance } from '@/lib/appearance'
import { AppearanceContext } from '@/providers/appearance-provider'
import type { Appearance } from '@/types'
import { Monitor, Moon, Sun, type LucideIcon } from 'lucide-react'
import { useContext, type ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'

export function AppearanceSelector() {
  // i18n
  const { t } = useTranslation()

  // Appearance context
  const { appearance, updateAppearance } = useContext(AppearanceContext)

  function appearanceSwitch() {
    switch (appearance) {
      case 'light':
        updateAppearance('dark')
        break

      case 'dark':
        updateAppearance('system')
        break

      case 'system':
      default:
        updateAppearance('light')
        break
    }
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={appearanceSwitch}
    >
      {appearance === 'light' && <Sun className="size-4" />}
      {appearance === 'dark' && <Moon className="size-4" />}
      {appearance === 'system' && <Monitor className="size-4" />}
      <span className="sr-only">{t(($) => $.appearance.change)}</span>
    </Button>
  )
}

export default function AppearanceSelect(props: ComponentProps<'div'>) {
  // i18n
  const { t } = useTranslation()

  // Appearance context
  const { appearance, updateAppearance } = useContext(AppearanceContext)

  const tabs: { value: Appearance; Icon: LucideIcon; label: string }[] = [
    { value: 'light', Icon: Sun, label: t(($) => $.appearance.light) },
    { value: 'dark', Icon: Moon, label: t(($) => $.appearance.dark) },
    { value: 'system', Icon: Monitor, label: t(($) => $.appearance.system) }
  ]

  function onValueChange(value: string) {
    if (isAppearance(value)) {
      updateAppearance(value)
    }
  }

  return (
    <div {...props}>
      <Select
        onValueChange={onValueChange}
        value={appearance}
      >
        <SelectTrigger
          aria-label={t(($) => $.appearance.select)}
          className="w-full"
        >
          <SelectValue placeholder={t(($) => $.appearance.select)} />
        </SelectTrigger>

        <SelectContent>
          {tabs.map(({ value, Icon, label }) => (
            <SelectItem
              key={value}
              value={value}
            >
              <div className="flex items-center gap-2">
                <Icon className="size-4 text-inherit" />
                <span>{label}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
