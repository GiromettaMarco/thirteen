import { Badge } from '@/components/ui/badge'
import type { TaskPriority } from '@/types'
import { ArrowDown, ArrowRight, ArrowUp } from 'lucide-react'
import { useTranslation } from 'react-i18next'

export function PriorityIcon({ priority }: { priority: TaskPriority }) {
  switch (priority) {
    case 'high':
      return <ArrowUp />

    case 'medium':
      return <ArrowRight />

    case 'low':
      return <ArrowDown />

    default:
      return
  }
}

export function PriorityName({ priority }: { priority: TaskPriority }) {
  // i18n
  const { t } = useTranslation()

  switch (priority) {
    case 'high':
      return t(($) => $.tasks.priorities.high)

    case 'medium':
      return t(($) => $.tasks.priorities.medium)

    case 'low':
      return t(($) => $.tasks.priorities.low)

    default:
      return
  }
}

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <Badge
      variant="outline"
      className="px-1.5 text-muted-foreground"
    >
      <PriorityIcon priority={priority} />
      <PriorityName priority={priority} />
    </Badge>
  )
}
