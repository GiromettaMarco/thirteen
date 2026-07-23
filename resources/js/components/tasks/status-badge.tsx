import { Calendar, Check, Ellipsis, Inbox, X } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import type { TaskStatus } from '@/types'

export function StatusIcon({ status }: { status: TaskStatus }) {
  switch (status) {
    case 'backlog':
      return <Inbox />

    case 'canceled':
      return <X />

    case 'done':
      return <Check />

    case 'in_progress':
      return <Ellipsis />

    case 'todo':
      return <Calendar />

    default:
      return
  }
}

export function StatusName({ status }: { status: TaskStatus }) {
  // i18n
  const { t } = useTranslation()

  switch (status) {
    case 'backlog':
      return t(($) => $.tasks.statuses.backlog)

    case 'canceled':
      return t(($) => $.tasks.statuses.canceled)

    case 'done':
      return t(($) => $.tasks.statuses.done)

    case 'in_progress':
      return t(($) => $.tasks.statuses.inProgress)

    case 'todo':
      return t(($) => $.tasks.statuses.todo)

    default:
      return
  }
}

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <Badge
      className="px-1.5 text-muted-foreground"
      variant="outline"
    >
      <StatusIcon status={status} />
      <StatusName status={status} />
    </Badge>
  )
}
