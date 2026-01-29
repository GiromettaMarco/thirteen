import type { BreadcrumbLink } from '@/components/breadcrumbs'
import { TeamPermissions } from '@/components/teams/permissions'
import { Container } from '@/components/ui/container'
import { Format } from '@/components/ui/format'
import { Separator } from '@/components/ui/separator'
import DashboardLayout from '@/layouts/dashboard-layout'
import { dashboard } from '@/routes'
import { index, show } from '@/routes/teams'
import type { Profile, Team, WithTeamPermissions } from '@/types'
import { Head } from '@inertiajs/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export default function TeamMembersShow({
  profile,
  team
}: {
  profile: Profile & WithTeamPermissions
  team: Team & WithTeamPermissions
}) {
  // i18n
  const { t } = useTranslation()

  const breadcrumbs = useMemo<BreadcrumbLink[]>(
    () => [
      { key: 1, href: dashboard(), label: t(($) => $.dashboard) },
      { key: 2, href: index(), label: t(($) => $.team, { count: 2 }) },
      { key: 3, href: show(team.id), label: team.name }
    ],
    [t, team.id, team.name]
  )

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      // button={<UpdateTeamDrawer team={team} />}
      title={profile.name}
    >
      <Head title={`${profile.name}@${team.name}`} />

      <Container className="grid gap-6">
        <Format
          h2="Member Role"
          p="This is what this member does in general (not just in this team)."
        >
          {profile.role}
        </Format>

        {team.pivot.can_edit_members && (
          <>
            <Separator />

            <Format
              h2="Permissions"
              p="Here you can edit the member permissions for this team. Administrator privileges are required."
            >
              <TeamPermissions
                canEdit={team.pivot.can_edit_members}
                profile={profile}
                teamId={team.id}
              />
            </Format>
          </>
        )}
      </Container>
    </DashboardLayout>
  )
}
