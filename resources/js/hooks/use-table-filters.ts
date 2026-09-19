import {
  ArrowDown,
  ArrowRight,
  ArrowUp,
  Calendar,
  Check,
  Ellipsis,
  Inbox,
  X
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import type { SelectionOption } from '@/components/data-table/utility'

export function useTaskLabelFilters(): SelectionOption[] {
  // i18n
  const { t } = useTranslation()

  return [
    {
      label: t(($) => $.tasks.labels.bug),
      value: 'bug'
    },
    {
      label: t(($) => $.tasks.labels.documentation),
      value: 'documentation'
    },
    {
      label: t(($) => $.tasks.labels.feature),
      value: 'feature'
    },
    {
      value: null
    }
  ]
}

export function useTaskPriorityFilters(): SelectionOption[] {
  // i18n
  const { t } = useTranslation()

  return [
    {
      Icon: ArrowDown,
      label: t(($) => $.tasks.priorities.low),
      value: 'low'
    },
    {
      Icon: ArrowRight,
      label: t(($) => $.tasks.priorities.medium),
      value: 'medium'
    },
    {
      Icon: ArrowUp,
      label: t(($) => $.tasks.priorities.high),
      value: 'high'
    }
  ]
}

export function useTaskStatusFilters(): SelectionOption[] {
  // i18n
  const { t } = useTranslation()

  return [
    {
      Icon: Inbox,
      label: t(($) => $.tasks.statuses.backlog),
      value: 'backlog'
    },
    {
      Icon: X,
      label: t(($) => $.tasks.statuses.canceled),
      value: 'canceled'
    },
    {
      Icon: Check,
      label: t(($) => $.tasks.statuses.done),
      value: 'done'
    },
    {
      Icon: Ellipsis,
      label: t(($) => $.tasks.statuses.inProgress),
      value: 'in_progress'
    },
    {
      Icon: Calendar,
      label: t(($) => $.tasks.statuses.todo),
      value: 'todo'
    }
  ]
}
