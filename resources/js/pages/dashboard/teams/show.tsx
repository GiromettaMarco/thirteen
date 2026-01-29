import type { BreadcrumbLink } from '@/components/breadcrumbs'
import { Container } from '@/components/ui/container'
import { Heading } from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import DashboardLayout from '@/layouts/dashboard-layout'
import { dashboard } from '@/routes'
import { show } from '@/routes/members'
import { index } from '@/routes/teams'
import type { Profile, Team, WithTeamPermissions } from '@/types'
import { Head, Link } from '@inertiajs/react'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export default function TeamsShow({
  profiles,
  team
}: {
  profiles: Profile[]
  team: Team & WithTeamPermissions
}) {
  console.log(profiles)

  // i18n
  const { t } = useTranslation()

  const breadcrumbs = useMemo<BreadcrumbLink[]>(
    () => [
      { key: 1, href: dashboard(), label: t(($) => $.dashboard) },
      { key: 2, href: index(), label: t(($) => $.team, { count: 2 }) }
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
            h={t(($) => $.teams.teamMembers)}
            variant="small"
          />

          <ul>
            {profiles.map((profile) => (
              <li key={profile.id}>
                <Link
                  href={show({
                    profile: profile.id,
                    team: team.id
                  })}
                >
                  {profile.name}
                </Link>
              </li>
            ))}
          </ul>
        </section>

        <Separator />

        <p>Projects table goes here</p>
      </Container>
    </DashboardLayout>
  )
}
