import { Badge } from '@/components/ui/badge'
import type { TaskLabel } from '@/types'
import { useTranslation } from 'react-i18next'

export function LabelName({ label }: { label: TaskLabel }) {
  // i18n
  const { t } = useTranslation()

  switch (label) {
    case 'bug':
      return t(($) => $.tasks.labels.bug)

    case 'documentation':
      return t(($) => $.tasks.labels.documentation)

    case 'feature':
      return t(($) => $.tasks.labels.feature)

    default:
      return
  }
}

export function LabelBadge({ label }: { label: TaskLabel | 'none' }) {
  return (
    <div className="w-32">
      {label !== 'none' && (
        <Badge
          variant="outline"
          className="px-1.5 text-muted-foreground"
        >
          <LabelName label={label} />
        </Badge>
      )}
    </div>
  )
}
