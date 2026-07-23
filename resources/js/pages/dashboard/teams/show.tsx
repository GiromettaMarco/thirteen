import { Separator } from '@gmcode/react-ui'
import { Head } from '@inertiajs/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { BreadcrumbLink } from '@/components/breadcrumbs'
import { ProjectsTable } from '@/components/projects/projects-table'
import { MembersTable } from '@/components/teams/members-table'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import DashboardLayout from '@/layouts/dashboard-layout'
import { parseView } from '@/lib/utils'
import { dashboard } from '@/routes'
import { index } from '@/routes/teams'
import type {
  Profile,
  Project,
  RawView,
  Team,
  WithTeamPermissions
} from '@/types'

export default function TeamsShow({
  members,
  projects,
  team,
  views
}: {
  members: Profile[]
  projects: Project[]
  team: Team & WithTeamPermissions
  views: {
    members: RawView | null
    projects: RawView | null
  }
}) {
  // i18n
  const { t } = useTranslation()

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
      // button={<UpdateTeamDrawer team={team} />}
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
            // canEdit={}
            // currentUserId={}
            members={members}
            teamId={team.id}
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
