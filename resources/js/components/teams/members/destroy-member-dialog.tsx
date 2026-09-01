import type { Dispatch, SetStateAction } from 'react'
import { useTranslation } from 'react-i18next'
import { DestroyDialog } from '@/components/ui/destroy-dialog'
import { destroy } from '@/routes/members'
import { leave } from '@/routes/teams'
import type { Team, TeamMember } from '@/types'

export function RemoveMemberDialog({
  member,
  open,
  setOpen,
  team
}: {
  member: TeamMember
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  team: Team
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <DestroyDialog
      description={t(($) => $.dialogs.removeMember.description, {
        member: member.name
      })}
      labels={{ delete: t(($) => $.actions.remove) }}
      open={open}
      route={destroy({ profile: member.id, team })}
      setOpen={setOpen}
      title={t(($) => $.dialogs.removeMember.title)}
    />
  )
}

export function LeaveTeamDialog({
  open,
  setOpen,
  team
}: {
  open: boolean
  setOpen: Dispatch<SetStateAction<boolean>>
  team: Team
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <DestroyDialog
      description={t(($) => $.dialogs.leaveTeam.description, {
        team: team.name
      })}
      labels={{ delete: t(($) => $.actions.leave) }}
      open={open}
      route={leave({ team })}
      setOpen={setOpen}
      title={t(($) => $.dialogs.leaveTeam.title)}
    />
  )
}
