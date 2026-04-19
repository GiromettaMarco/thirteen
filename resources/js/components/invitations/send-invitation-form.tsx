import { EmailField, Form, SelectField, TextField } from '@/components/form'
import { Submit } from '@/components/ui/submit'
import { store } from '@/routes/invitations'
import { createInvitationSchema } from '@/schemas/invitations'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export function SendInvitationForm() {
  // i18n
  const { t } = useTranslation()

  const roles = useMemo(
    () => [
      { key: 'guest', label: t(($) => $.roles.guest), value: 'guest' },
      {
        key: 'developer',
        label: t(($) => $.roles.developer),
        value: 'developer'
      },
      { key: 'designer', label: t(($) => $.roles.designer), value: 'designer' },
      { key: 'manager', label: t(($) => $.roles.manager), value: 'manager' }
    ],
    [t]
  )

  return (
    <Form
      className="grid gap-3"
      route={store()}
      schema={createInvitationSchema}
    >
      {({ form, loading }) => (
        <>
          <TextField
            autoComplete="off"
            control={form.control}
            inputId="name"
            inputName="name"
            label={t(($) => $.name)}
            placeholder={t(($) => $.fullName)}
          />

          <EmailField
            autoComplete="off"
            control={form.control}
            inputId="email"
            inputName="email"
            label={t(($) => $.emailAddress)}
            placeholder="email@example.com"
          />

          <SelectField
            control={form.control}
            inputId="role"
            inputName="role"
            label={t(($) => $.role)}
            placeholder={t(($) => $.pages.dashboard.invitations.send.role)}
            options={roles}
          />

          <Submit
            className="mt-4 w-36"
            label={t(($) => $.send)}
            loading={loading}
          />
        </>
      )}
    </Form>
  )
}
