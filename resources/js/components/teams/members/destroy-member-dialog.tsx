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
      description={t(($) => $.teams.members.delete.description, {
        member: member.name
      })}
      labels={{ delete: t(($) => $.remove) }}
      open={open}
      route={destroy({ profile: member.id, team })}
      setOpen={setOpen}
      title={t(($) => $.teams.members.delete.title)}
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
      description={t(($) => $.teams.leaveDesc, { team: team.name })}
      labels={{ delete: t(($) => $.teams.leave) }}
      open={open}
      route={leave({ team })}
      setOpen={setOpen}
      title={t(($) => $.teams.leaveTitle)}
    />
  )
}
