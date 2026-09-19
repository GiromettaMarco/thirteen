import { Separator } from '@gmcode/react-ui'
import { Head, usePage } from '@inertiajs/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { BreadcrumbLink } from '@/components/breadcrumbs'
import { ProjectsTable } from '@/components/projects/projects-table'
import { MembersTable } from '@/components/teams/members/members-table'
import UpdateTeamDrawer from '@/components/teams/update-team-drawer'
import DashboardLayout from '@/layouts/dashboard-layout'
import { dashboard } from '@/routes'
import { index } from '@/routes/teams'
import type {
  ProjectWithTasksCount,
  Team,
  TeamMember,
  WithTeamPermissions
} from '@/types'

export default function TeamsShow({
  members,
  projects,
  team
}: {
  members: TeamMember[]
  projects: ProjectWithTasksCount[]
  team: Team & WithTeamPermissions
}) {
  // i18n
  const { t } = useTranslation()

  const { user } = usePage().props.auth

  const breadcrumbs = useMemo<BreadcrumbLink[]>(
    () => [
      { href: dashboard(), key: 1, label: t(($) => $.dashboard) },
      { href: index(), key: 2, label: t(($) => $.team, { count: 2 }) }
    ],
    [t]
  )

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      button={team.pivot.can_edit_team && <UpdateTeamDrawer team={team} />}
      title={team.name}
    >
      <Head title={team.name} />

      <div className="grid gap-6 px-4 lg:px-6">
        <ProjectsTable
          canEdit={team.pivot.can_edit_projects}
          projects={projects}
          storage={`team-${team.id}:projects`}
          teamId={team.id}
          title={t(($) => $.project, { count: 2 })}
        />

        <Separator />

        <MembersTable
          canEdit={team.pivot.can_edit_members}
          currentProfileId={user?.profile_id}
          members={members}
          storage={`team-${team.id}:members`}
          team={team}
          title={t(($) => $.teams.teamMembers)}
        />
      </div>
    </DashboardLayout>
  )
}
