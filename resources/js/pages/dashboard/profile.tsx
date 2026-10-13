import { FancyRadioField, Form, InfoCheckboxField, Submit } from '@gmcode/forms'
import { Button, Separator } from '@gmcode/react-ui'
import { Head } from '@inertiajs/react'
import { differenceInCalendarDays } from 'date-fns'
import { ChartNoAxesGantt, Code2, Handshake, Palette } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NameFieldPreset } from '@/components/auth/fields'
import { EmailPill, ProfilePill, RolePill } from '@/components/profile-pill'
import { Container } from '@/components/ui/container'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '@/components/ui/drawer'
import { Format } from '@/components/ui/format'
import { UpdateDrawerTrigger } from '@/components/update-drawer-trigger'
import DashboardLayout from '@/layouts/dashboard-layout'
import { format } from '@/lib/utils'
import { update } from '@/routes/profile'
import { updateProfileSchema } from '@/schemas/profile'
import type { Profile } from '@/types'

//#region UpdateProfileDrawer
function UpdateProfileDrawer({ profile }: { profile: Profile }) {
  // i18n
  const { t } = useTranslation()

  const [open, setOpen] = useState(false)

  const roles = useMemo(
    () => [
      {
        Icon: Handshake,
        label: t(($) => $.roles.guest),
        value: 'guest'
      },
      {
        Icon: Code2,
        label: t(($) => $.roles.developer),
        value: 'developer'
      },
      {
        Icon: Palette,
        label: t(($) => $.roles.designer),
        value: 'designer'
      },
      {
        Icon: ChartNoAxesGantt,
        label: t(($) => $.roles.manager),
        value: 'manager'
      }
    ],
    [t]
  )

  return (
    <Drawer
      onOpenChange={setOpen}
      open={open}
    >
      <UpdateDrawerTrigger onClick={() => setOpen(true)} />

      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {t(($) => $.pages.dashboard.profile.drawer.title)}
          </DrawerTitle>
          <DrawerDescription>
            {t(($) => $.pages.dashboard.profile.drawer.description)}
          </DrawerDescription>
        </DrawerHeader>

        <Form
          className="h-full overflow-y-auto"
          defaults={{
            name: profile.name,
            public: profile.public ? 'true' : '',
            role: profile.role
          }}
          id="update-profile-form"
          onSuccess={() => setOpen(false)}
          route={update(profile.id)}
          schema={updateProfileSchema}
          setDefaultsOnSuccess={true}
        >
          {({ form, loading }) => (
            <>
              <div className="flex flex-col gap-6 px-4">
                <NameFieldPreset control={form.control} />

                <FancyRadioField
                  control={form.control}
                  defaultValue={profile.role}
                  inputName="role"
                  label={t(($) => $.role)}
                  options={roles}
                />

                <InfoCheckboxField
                  className="mt-2"
                  control={form.control}
                  inputName="public"
                  label={t(($) => $.pages.dashboard.profile.public)}
                  text={t(($) => $.pages.dashboard.profile.info)}
                />
              </div>

              <DrawerFooter>
                <Submit
                  label={t(($) => $.actions.save)}
                  loading={loading}
                />

                <DrawerClose asChild>
                  <Button variant="outline">{t(($) => $.actions.close)}</Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </Form>
      </DrawerContent>
    </Drawer>
  )
}

//#region Profile
export default function Profile({
  canEdit,
  email,
  profile,
  tasksCount
}: {
  canEdit: boolean
  email: string
  profile: Profile & {
    teams_count: number
  }
  tasksCount: {
    done: number
    in_progress: number
    todo: number
    total: number
  }
}) {
  // i18n
  const { i18n, t } = useTranslation()

  const [today] = useState(() => new Date())

  const joined = differenceInCalendarDays(today, profile.created_at)

  return (
    <DashboardLayout
      button={canEdit ? <UpdateProfileDrawer profile={profile} /> : undefined}
      title={profile.name}
    >
      <Head
        title={t(($) => $.pages.dashboard.profile.title, {
          name: profile.name
        })}
      />

      <Container className="grid gap-6">
        <Format
          h2={t(($) => $.pages.dashboard.profile.user.title)}
          p={t(($) => $.pages.dashboard.profile.user.description, {
            name: profile.name
          })}
        >
          <div className="flex flex-wrap gap-4">
            <RolePill role={profile.role} />
            <ProfilePill
              description={t(($) => $.pages.dashboard.profile.joined, {
                count: joined
              })}
              number={joined}
              title={format(profile.created_at, i18n.language)}
            />
            <EmailPill email={email} />
          </div>
        </Format>

        <Separator />

        <Format
          h2={t(($) => $.pages.dashboard.profile.activity.title)}
          p={t(($) => $.pages.dashboard.profile.activity.description)}
        >
          <div className="flex flex-wrap gap-4">
            <ProfilePill
              description={t(($) => $.pages.dashboard.profile.teams, {
                count: profile.teams_count
              })}
              number={profile.teams_count}
              title={t(($) => $.team, { count: 2 })}
            />
            <ProfilePill
              description={t(($) => $.pages.dashboard.profile.tasksTotal, {
                count: tasksCount.total
              })}
              number={tasksCount.total}
              title={t(($) => $.task, { count: 2 })}
            />
            <ProfilePill
              description={t(($) => $.pages.dashboard.profile.tasksDone, {
                count: tasksCount.done
              })}
              number={tasksCount.done}
              title={t(($) => $.tasks.statuses.done)}
            />
            <ProfilePill
              description={t(($) => $.pages.dashboard.profile.tasksInProgress, {
                count: tasksCount.in_progress
              })}
              number={tasksCount.in_progress}
              title={t(($) => $.tasks.statuses.inProgress)}
            />
            <ProfilePill
              description={t(($) => $.pages.dashboard.profile.tasksTodo, {
                count: tasksCount.todo
              })}
              number={tasksCount.todo}
              title={t(($) => $.tasks.statuses.todo)}
            />
          </div>
        </Format>
      </Container>
    </DashboardLayout>
  )
}
