import { ChartNoAxesGantt, Code2, Handshake, Mail, Palette } from 'lucide-react'
import type { ComponentProps } from 'react'
import { useTranslation } from 'react-i18next'
import type { ProfileRole } from '@/types'

export function ProfilePill({
  description,
  number,
  title
}: {
  description?: string
  number: string | number
  title: string
}) {
  return (
    <div className="flex w-full items-center gap-2 rounded-xl border bg-card p-2 text-sm sm:w-68">
      <div className="flex h-8 min-w-8 items-center justify-center rounded-lg bg-muted p-1 text-lg font-semibold tabular-nums">
        {number}
      </div>
      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{title}</span>
        {description && (
          <span className="truncate text-xs text-muted-foreground">
            {description}
          </span>
        )}
      </div>
    </div>
  )
}

export function EmailPill({ email }: { email: string }) {
  return (
    <a
      className="flex w-full items-center gap-2 rounded-xl border bg-primary p-2 text-sm text-primary-foreground hover:bg-primary/90 sm:w-68"
      href={`mailto:${email}`}
    >
      <div className="flex size-8 items-center justify-center rounded-lg p-1 text-lg font-semibold tabular-nums">
        <Mail />
      </div>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">Send an email</span>

        <span className="truncate text-xs">{email}</span>
      </div>
    </a>
  )
}

function RoleIcon({
  role,
  ...props
}: ComponentProps<'svg'> & { role: ProfileRole }) {
  switch (role) {
    case 'designer':
      return <Palette {...props} />

    case 'developer':
      return <Code2 {...props} />

    case 'guest':
      return <Handshake {...props} />

    case 'manager':
      return <ChartNoAxesGantt {...props} />

    default:
      return null
  }
}

export function RolePill({ role }: { role: ProfileRole }) {
  // i18n
  const { t } = useTranslation()

  return (
    <div className="flex w-full items-center gap-2 rounded-xl border bg-card p-2 text-sm sm:w-68">
      <div className="flex size-8 items-center justify-center rounded-lg p-1 text-lg font-semibold tabular-nums">
        <RoleIcon role={role} />
      </div>

      <div className="grid flex-1 text-left text-sm leading-tight">
        <span className="truncate font-medium">{t(($) => $.roles[role])}</span>
      </div>
    </div>
  )
}
