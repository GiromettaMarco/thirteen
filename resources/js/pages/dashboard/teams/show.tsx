import { Separator } from '@gmcode/react-ui'
import { Head, usePage } from '@inertiajs/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { BreadcrumbLink } from '@/components/breadcrumbs'
import { ProjectsTable } from '@/components/projects/projects-table'
import { MembersTable } from '@/components/teams/members/members-table'
import UpdateTeamDrawer from '@/components/teams/update-team-drawer'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import DashboardLayout from '@/layouts/dashboard-layout'
import { parseView } from '@/lib/utils'
import { dashboard } from '@/routes'
import { index } from '@/routes/teams'
import type {
  ProjectWithTasksCount,
  RawView,
  Team,
  TeamMember,
  WithTeamPermissions
} from '@/types'

export default function TeamsShow({
  members,
  projects,
  team,
  views
}: {
  members: TeamMember[]
  projects: ProjectWithTasksCount[]
  team: Team & WithTeamPermissions
  views: {
    members: RawView | null
    projects: RawView | null
  }
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
      button={<UpdateTeamDrawer team={team} />}
      title={team.name}
    >
      <Head title={team.name} />

      <Container className="grid gap-6">
        <section className="grid gap-1">
          <Heading
            h={t(($) => $.project, { count: 2 })}
            variant="small"
          />
          <ProjectsTable
            canEdit={team.pivot.can_edit_projects}
            projects={projects}
            teamId={team.id}
            view={parseView(views.projects)}
            viewStore={{
              page: `teams.show/${team.id}`,
              table: 'projects'
            }}
          />
        </section>

        <Separator />

        <section className="grid gap-1">
          <Heading
            h={t(($) => $.teams.teamMembers)}
            variant="small"
          />
          <MembersTable
            canEdit={team.pivot.can_edit_members}
            currentProfileId={user?.profile_id}
            members={members}
            team={team}
            view={parseView(views.members)}
            viewStore={{
              page: `teams.show/${team.id}`,
              table: 'members'
            }}
          />
        </section>
      </Container>
    </DashboardLayout>
  )
}
