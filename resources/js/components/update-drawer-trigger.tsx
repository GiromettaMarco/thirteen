import { Button } from '@/components/ui/button'
import { DrawerTrigger } from '@/components/ui/drawer'
import { Edit } from 'lucide-react'
import type { MouseEventHandler } from 'react'
import { useTranslation } from 'react-i18next'

export function UpdateDrawerTrigger({
  onClick
}: {
  onClick?: MouseEventHandler<HTMLButtonElement>
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <DrawerTrigger asChild>
      <Button
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
