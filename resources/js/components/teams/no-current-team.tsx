import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle
} from '@/components/ui/empty'
import { AppContext } from '@/providers/app-context-provider'
import { index } from '@/routes/teams'
import { Button } from '@gmcode/react-ui'
import { Link } from '@inertiajs/react'
import { UserStar } from 'lucide-react'
import { useContext } from 'react'
import { useTranslation } from 'react-i18next'

export function NoCurrentTeam() {
  // i18n
  const { t } = useTranslation()

  // App context
  const { setAddTeamOpen: setOpen } = useContext(AppContext)

  return (
    <Empty className="rounded-md border border-solid">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <UserStar />
        </EmptyMedia>

        <EmptyTitle>{t(($) => $.noCurrentTeam.title)}</EmptyTitle>

        <EmptyDescription>
          {t(($) => $.noCurrentTeam.description)}
        </EmptyDescription>
      </EmptyHeader>

      <EmptyContent>
        <Button
          asChild
          onClick={() => setOpen(true)}
        >
          <Link href={index()}>{t(($) => $.teams.createTeam)}</Link>
        </Button>
      </EmptyContent>
    </Empty>
  )
}
