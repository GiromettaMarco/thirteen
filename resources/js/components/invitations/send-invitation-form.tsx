import { Submit } from '@/components/ui/submit'
import { MultipleCheckboxField } from '@/components/uncontrolled-inputs'
import { store } from '@/routes/invitations'
import { createInvitationSchema } from '@/schemas/invitations'
import type { Team } from '@/types'
import { EmailField, Form, SelectField, TextField } from '@gmcode/forms'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'

export function SendInvitationForm({ teams }: { teams: Team[] }) {
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
      defaults={{
        email: '',
        name: '',
        role: 'guest',
        teams: '[]'
      }}
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

          {teams && (
            <MultipleCheckboxField
              className="gap-3 [&_legend]:mb-1"
              description={t(($) => $.pages.dashboard.invitations.teams)}
              items={teams.map((team) => ({
                id: team.id.toString(),
                label: team.name,
                value: team.id.toString()
              }))}
              legend={t(($) => $.team, { count: 2 })}
              name="teams"
              onValueChange={(values) =>
                form.setValue('teams', JSON.stringify(values))
              }
            />
          )}

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
