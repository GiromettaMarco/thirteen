import { FancyRadioField, Form, InfoCheckboxField, Submit } from '@gmcode/forms'
import { Button } from '@gmcode/react-ui'
import { Head } from '@inertiajs/react'
import { ChartNoAxesGantt, Code2, Handshake, Palette } from 'lucide-react'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { NameFieldPreset } from '@/components/auth/fields'
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
import { UpdateDrawerTrigger } from '@/components/update-drawer-trigger'
import DashboardLayout from '@/layouts/dashboard-layout'
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
            {t(($) => $.pages.dashboard.profile.drawerTitle)}
          </DrawerTitle>
          <DrawerDescription>
            {t(($) => $.pages.dashboard.profile.drawerDescription)}
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
                  label={t(($) => $.save)}
                  loading={loading}
                />

                <DrawerClose asChild>
                  <Button variant="outline">{t(($) => $.close)}</Button>
                </DrawerClose>
              </DrawerFooter>
            </>
          )}
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
//#endregion

//#region Profile
export default function Profile({
  canEdit,
  profile
}: {
  canEdit: boolean
  profile: Profile
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout
      button={canEdit ? <UpdateProfileDrawer profile={profile} /> : undefined}
      title={t(($) => $.profile)}
    >
      <Head
        title={t(($) => $.pages.dashboard.profile.title, {
          name: profile.name
        })}
      />

      <Container className="grid gap-6">
        <Button variant="outline">XXX</Button>

        <p>{profile.name}</p>
        <p>{profile.role}</p>
        <p>{profile.public ? 'public' : 'private'}</p>
      </Container>
    </DashboardLayout>
  )
}
//#endregion
