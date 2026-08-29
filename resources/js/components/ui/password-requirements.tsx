import { cn } from '@gmcode/react-ui'
import { Check, X } from 'lucide-react'
import type { PropsWithChildren } from 'react'
import { useTranslation } from 'react-i18next'
import type { PasswordReport } from '@/types'

function Requirement({
  children,
  fulfilled
}: PropsWithChildren<{ fulfilled?: boolean }>) {
  return (
    <li
      className={cn('flex items-center gap-2', {
        'text-success-foreground': fulfilled
      })}
    >
      {fulfilled ? <Check className="size-4" /> : <X className="size-4" />}
      {children}
    </li>
  )
}

export function PasswordRequirements({ report }: { report: PasswordReport }) {
  // i18n
  const { t } = useTranslation()

  return (
    <div className="space-y-1 text-sm text-muted-foreground">
      <p>{t(($) => $.auth.requirements.p)}</p>
      <ul>
        <Requirement fulfilled={report.hasLength}>
          {t(($) => $.auth.requirements.hasLength)}
        </Requirement>
        <Requirement fulfilled={report.hasUppercase}>
          {t(($) => $.auth.requirements.hasUppercase)}
        </Requirement>
        <Requirement fulfilled={report.hasLowercase}>
          {t(($) => $.auth.requirements.hasLowercase)}
        </Requirement>
        <Requirement fulfilled={report.hasNumber}>
          {t(($) => $.auth.requirements.hasNumber)}
        </Requirement>
        <Requirement fulfilled={report.hasSymbol}>
          {t(($) => $.auth.requirements.hasSymbol)}
        </Requirement>
      </ul>
    </div>
  )
}
