import {
  Button,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@gmcode/react-ui'
import { Moon, Sun, type LucideIcon } from 'lucide-react'
import { useContext, type ComponentProps, type SVGAttributes } from 'react'
import { useTranslation } from 'react-i18next'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { isAppearance } from '@/lib/appearance'
import { AppearanceContext } from '@/providers/appearance-provider'
import type { Appearance } from '@/types'

export function ThemeIcon(props: SVGAttributes<SVGElement>) {
  return (
    <svg
      height="24"
      viewBox="0 0 24 24"
      width="24"
      {...props}
    >
      <path
        d="m12 21c4.971 0 9-4.029 9-9s-4.029-9-9-9-9 4.029-9 9 4.029 9 9 9zm4.95-13.95c1.313 1.313 2.05 3.093 2.05 4.95s-0.738 3.637-2.05 4.95c-1.313 1.313-3.093 2.05-4.95 2.05v-14c1.857 0 3.637 0.737 4.95 2.05z"
        fill="currentColor"
      />
    </svg>
  )
}

export function AppearanceSelector({
  variant = 'outline'
}: {
  variant?: 'default' | 'outline' | 'secondary' | 'ghost'
}) {
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
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          onClick={appearanceSwitch}
          size="icon"
          variant={variant}
        >
          {appearance === 'light' && <Sun className="size-4" />}
          {appearance === 'dark' && <Moon className="size-4" />}
          {appearance === 'system' && <ThemeIcon className="size-4" />}
          <span className="sr-only">{t(($) => $.appearance.change)}</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <span>{t(($) => $.appearance.change)}</span>
      </TooltipContent>
    </Tooltip>
  )
}

export function AppearanceSelect(props: ComponentProps<'div'>) {
  // i18n
  const { t } = useTranslation()

  // Appearance context
  const { appearance, updateAppearance } = useContext(AppearanceContext)

  const tabs: {
    Icon: LucideIcon | typeof ThemeIcon
    label: string
    value: Appearance
  }[] = [
    { Icon: Sun, label: t(($) => $.appearance.light), value: 'light' },
    { Icon: Moon, label: t(($) => $.appearance.dark), value: 'dark' },
    { Icon: ThemeIcon, label: t(($) => $.appearance.system), value: 'system' }
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
          id="select-appearance"
        >
          <SelectValue placeholder={t(($) => $.appearance.select)} />
        </SelectTrigger>

        <SelectContent>
          {tabs.map(({ Icon, label, value }) => (
            <SelectItem
              id={`appearance-${value}`}
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
