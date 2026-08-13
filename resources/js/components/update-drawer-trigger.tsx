import { Button } from '@gmcode/react-ui'
import { Edit } from 'lucide-react'
import type { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'
import { DrawerTrigger } from '@/components/ui/drawer'

export function UpdateDrawerTrigger({
  id = 'open-update-drawer',
  onClick
}: {
  id?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <DrawerTrigger asChild>
      <Button
        id={id}
        onClick={onClick}
        size="sm"
        variant="ghost"
      >
        <span className="sr-only sm:not-sr-only">{t(($) => $.edit)}</span>
        <Edit />
      </Button>
    </DrawerTrigger>
  )
}
