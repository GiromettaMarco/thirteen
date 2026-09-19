import { useTranslation } from 'react-i18next'
import { Badge } from '@/components/ui/badge'
import type { TaskLabel } from '@/types'

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
      return null
  }
}

export function LabelBadge({ label }: { label: TaskLabel | null }) {
  if (!label) {
    return null
  }

  return (
    <div className="w-32">
      <Badge
        className="px-1.5 text-muted-foreground"
        variant="outline"
      >
        <LabelName label={label} />
      </Badge>
    </div>
  )
}
