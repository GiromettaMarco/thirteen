import {
  ConfirmPasswordFieldPreset,
  EmailFieldPreset,
  PasswordFieldPreset
} from '@/components/auth/fields'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/ui/container'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Format } from '@/components/ui/format'
import { Infobox } from '@/components/ui/infobox'
import { Separator } from '@/components/ui/separator'
import { Submit } from '@/components/ui/submit'
import DashboardLayout from '@/layouts/dashboard-layout'
import {
  update as accountUpdate,
  destroy as destroyAccount
} from '@/routes/account'
import { update as passwordUpdate } from '@/routes/password'
import { destroy as destroySessions } from '@/routes/sessions'
import { updateAccountSchema, updatePasswordSchema } from '@/schemas/account'
import { passwordConfirmSchema } from '@/schemas/auth'
import type { Auth, Session } from '@/types'
import { Form, PasswordField } from '@gmcode/forms'
import { Head } from '@inertiajs/react'
import { Monitor, Smartphone } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

//#region ManageSessions
function ManageSessions({ sessions }: { sessions: Session[] }) {
  // i18n
  const { t } = useTranslation()

  // Dialog state
  const [open, setOpen] = useState(false)

  return (
    <Format
      h2={t(($) => $.pages.dashboard.account.sessions.h2)}
      p={t(($) => $.pages.dashboard.account.sessions.p)}
    >
      <Infobox variant="info">
        <p>{t(($) => $.pages.dashboard.account.sessions.info)}</p>
      </Infobox>

      <div className="space-y-3">
        {sessions.map((session, index) => (
          <div
            className="flex items-center"
            key={index}
          >
            <div>{session.agent.is_desktop ? <Monitor /> : <Smartphone />}</div>

            <div className="ms-3">
              <div className="text-sm text-muted-foreground">
                {session.agent.platform ?? 'Unknown'} -{' '}
                {session.agent.browser ?? 'Unknown'}
              </div>

              <div>
                <div className="text-xs text-muted-foreground">
                  {session.ip_address},{' '}
                  {session.is_current_device ? (
                    <span className="font-semibold text-success-foreground">
                      {t(($) => $.pages.dashboard.account.sessions.thisDevice)}
                    </span>
                  ) : (
                    <span>
                      {t(($) => $.pages.dashboard.account.sessions.thisDevice)}{' '}
                      {session.last_active}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        <Dialog
          open={open}
          onOpenChange={setOpen}
        >
          <DialogTrigger asChild>
            <Button variant="destructive">
              {t(($) => $.pages.dashboard.account.sessions.dialog.trigger)}
            </Button>
          </DialogTrigger>

          <DialogContent>
            <DialogTitle>
              {t(($) => $.pages.dashboard.account.sessions.dialog.title)}
            </DialogTitle>

            <DialogDescription>
              {t(($) => $.pages.dashboard.account.sessions.dialog.description)}
            </DialogDescription>

            <Form
              onSuccess={() => setOpen(false)}
              route={destroySessions()}
              schema={passwordConfirmSchema}
            >
              {({ form, loading }) => (
                <>
                  <PasswordFieldPreset
                    control={form.control}
                    placeholder={false}
                  />

                  <DialogFooter className="items-center">
                    <DialogClose asChild>
                      <Button variant="secondary">{t(($) => $.cancel)}</Button>
                    </DialogClose>

                    <Submit
                      label={t(($) => $.delete)}
                      loading={loading}
                      variant="destructive"
                    />
                  </DialogFooter>
                </>
              )}
            </Form>
          </DialogContent>
        </Dialog>
      </div>
    </Format>
  )
}
//#endregion

//#region UpdateEmail
function UpdateEmail({ email }: { email: string }) {
  // i18n
  const { t } = useTranslation()

  return (
    <Format
      h2={t(($) => $.pages.dashboard.account.email.h2)}
      p={t(($) => $.pages.dashboard.account.email.p)}
    >
      <Infobox variant="info">
        <p>{t(($) => $.pages.dashboard.account.email.info)}</p>
      </Infobox>

      <Form
        className="gap-3"
        defaults={{ email }}
        route={accountUpdate()}
        schema={updateAccountSchema}
        setDefaultsOnSuccess
      >
        {({ form, loading }) => (
          <>
            <EmailFieldPreset control={form.control} />

            <Submit
              className="w-36"
              label={t(($) => $.save)}
              loading={loading}
            />
          </>
        )}
      </Form>
    </Format>
  )
}
//#endregion

//#region UpdatePassword
function UpdatePassword() {
  // i18n
  const { t } = useTranslation()

  return (
    <Format
      h2={t(($) => $.pages.dashboard.account.password.h2)}
      p={t(($) => $.pages.dashboard.account.password.p)}
    >
      <Form
        className="gap-3"
        resetOnSuccess={true}
        route={passwordUpdate()}
        schema={updatePasswordSchema}
      >
        {({ form, loading }) => (
          <>
            <PasswordField
              control={form.control}
              inputId="current-password"
              inputName="current_password"
              label={t(($) => $.auth.currentPassword)}
            />

            <PasswordFieldPreset
              control={form.control}
              placeholder={false}
            />

            <ConfirmPasswordFieldPreset
              control={form.control}
              placeholder={false}
            />

            <Submit
              className="w-36"
              label={t(($) => $.pages.dashboard.account.password.submit)}
              loading={loading}
            />
          </>
        )}
      </Form>
    </Format>
  )
}
//#endregion

//#region DeleteAccount
function DeleteAccount() {
  // i18n
  const { t } = useTranslation()

  return (
    <Format
      h2={t(($) => $.pages.dashboard.account.delete.h2)}
      p={t(($) => $.pages.dashboard.account.delete.p)}
    >
      <Infobox variant="error">
        <p>{t(($) => $.pages.dashboard.account.delete.info)}</p>
      </Infobox>

      <Dialog>
        <DialogTrigger asChild>
          <Button
            className="w-36"
            data-test="delete-account"
            variant="destructive"
          >
            {t(($) => $.pages.dashboard.account.delete.dialog.trigger)}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogTitle>
            {t(($) => $.pages.dashboard.account.delete.dialog.title)}
          </DialogTitle>

          <DialogDescription>
            {t(($) => $.pages.dashboard.account.delete.dialog.description)}
          </DialogDescription>

          <Form
            route={destroyAccount()}
            schema={passwordConfirmSchema}
          >
            {({ form, loading }) => (
              <>
                <PasswordFieldPreset
                  control={form.control}
                  placeholder={false}
                />

                <DialogFooter className="items-center">
                  <DialogClose asChild>
                    <Button variant="secondary">{t(($) => $.cancel)}</Button>
                  </DialogClose>

                  <Submit
                    label={t(($) => $.delete)}
                    loading={loading}
                    variant="destructive"
                  />
                </DialogFooter>
              </>
            )}
          </Form>
        </DialogContent>
      </Dialog>
    </Format>
  )
}
//#endregion

//#region Account (page)
export default function Account({
  auth,
  sessions
}: {
  auth: Auth<true>
  sessions: Session[]
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <DashboardLayout title={t(($) => $.account)}>
      <Head title={t(($) => $.pages.dashboard.account.title)} />

      <Container className="grid gap-6">
        <UpdateEmail email={auth.user.email} />

        <Separator />

        <UpdatePassword />

        <Separator />

        <ManageSessions sessions={sessions} />

        <Separator />

        <DeleteAccount />
      </Container>
    </DashboardLayout>
  )
}
//#endregion
