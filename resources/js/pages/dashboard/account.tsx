import { Form, PasswordField, Submit } from '@gmcode/forms'
import { Button, Infobox, Separator } from '@gmcode/react-ui'
import { Head } from '@inertiajs/react'
import { Monitor, Smartphone } from 'lucide-react'
import { useState, type ChangeEvent } from 'react'
import { useTranslation } from 'react-i18next'
import {
  ConfirmPasswordFieldPreset,
  EmailFieldPreset,
  PasswordFieldPreset
} from '@/components/auth/fields'
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
import { PasswordRequirements } from '@/components/ui/password-requirements'
import { usePasswordCheck } from '@/hooks/use-password-check'
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

//#region ManageSessions
function ManageSessions({ sessions }: { sessions: Session[] }) {
  // i18n
  const { i18n, t } = useTranslation()

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
          onOpenChange={setOpen}
          open={open}
        >
          <DialogTrigger asChild>
            <Button
              id="open-delete-sessions-dialog"
              variant="destructive"
            >
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
              id="delete-sessions-form"
              onSuccess={() => setOpen(false)}
              route={destroySessions()}
              schema={passwordConfirmSchema}
            >
              {({ form, loading }) => (
                <>
                  <PasswordFieldPreset
                    control={form.control}
                    i18n={i18n}
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
  const { i18n, t } = useTranslation()

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
        id="update-email-form"
        route={accountUpdate()}
        schema={updateAccountSchema}
        setDefaultsOnSuccess
      >
        {({ form, loading }) => (
          <>
            <EmailFieldPreset
              control={form.control}
              i18n={i18n}
            />

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
  const { i18n, t } = useTranslation()
  const { check, report } = usePasswordCheck()

  return (
    <Format
      customDescription={<PasswordRequirements report={report} />}
      h2={t(($) => $.pages.dashboard.account.password.h2)}
    >
      <Form
        className="gap-3"
        id="update-password-form"
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

            <PasswordField
              control={form.control}
              inputId="new-password"
              inputName="password"
              label={t(($) => $.auth.newPassword)}
              // @TODO update forms package
              onChange={(event: ChangeEvent<HTMLInputElement>) =>
                check(event.target.value)
              }
            />

            <ConfirmPasswordFieldPreset
              control={form.control}
              i18n={i18n}
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
  const { i18n, t } = useTranslation()

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
            id="open-delete-account-dialog"
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
            id="delete-account-form"
            route={destroyAccount()}
            schema={passwordConfirmSchema}
          >
            {({ form, loading }) => (
              <>
                <PasswordFieldPreset
                  control={form.control}
                  i18n={i18n}
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
