import { Button, Separator } from '@gmcode/react-ui'
import { Head, Link } from '@inertiajs/react'
import { UserRound } from 'lucide-react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import type { BreadcrumbLink } from '@/components/breadcrumbs'
import { RolePill } from '@/components/profile-pill'
import { MemberTasksChart } from '@/components/teams/members/member-charts'
import { TeamPermissions } from '@/components/teams/permissions'
import { Container } from '@/components/ui/container'
import { Format } from '@/components/ui/format'
import DashboardLayout from '@/layouts/dashboard-layout'
import { dashboard } from '@/routes'
import { show as profileShow } from '@/routes/profile'
import { index, show as teamShow } from '@/routes/teams'
import type { Profile, TasksCount, Team, WithTeamPermissions } from '@/types'

export default function TeamMembersShow({
  profile,
  tasksCount,
  team
}: {
  profile: Profile & WithTeamPermissions
  tasksCount: TasksCount
  team: Team & WithTeamPermissions
}) {
  // i18n
  const { t } = useTranslation()

  const breadcrumbs = useMemo<BreadcrumbLink[]>(
    () => [
      { href: dashboard(), key: 1, label: t(($) => $.dashboard) },
      { href: index(), key: 2, label: t(($) => $.team, { count: 2 }) },
      { href: teamShow(team.id), key: 3, label: team.name }
    ],
    [t, team.id, team.name]
  )

  return (
    <DashboardLayout
      breadcrumbs={breadcrumbs}
      button={
        profile.public ? (
          <Button
            asChild
            size="sm"
            variant="ghost"
          >
            <Link href={profileShow(profile)}>
              <span className="sr-only sm:not-sr-only">
                {t(($) => $.profile)}
              </span>
              <UserRound />
            </Link>
          </Button>
        ) : undefined
      }
      title={profile.name}
    >
      <Head title={`${profile.name}@${team.name}`} />

      <Container className="grid gap-6">
        <Format
          h2={t(($) => $.teams.members.show.role.title)}
          p={t(($) => $.teams.members.show.role.description)}
        >
          <RolePill role={profile.role} />
        </Format>

        <Separator />

        <Format
          h2={t(($) => $.teams.members.show.tasks.title)}
          p={t(($) => $.teams.members.show.tasks.description)}
        >
          <MemberTasksChart tasksCount={tasksCount} />
        </Format>

        {team.pivot.can_edit_members && (
          <>
            <Separator />

            <Format
              h2={t(($) => $.teams.members.show.permissions.title)}
              p={t(($) => $.teams.members.show.permissions.description)}
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
