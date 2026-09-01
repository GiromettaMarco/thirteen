import { CheckboxField, Form, Submit } from '@gmcode/forms'
import { Checkbox, Field, FieldLabel } from '@gmcode/react-ui'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { update } from '@/routes/members'
import { updateTeamPermissionsSchema } from '@/schemas/teams'
import type { Profile, TeamPermissions, WithTeamPermissions } from '@/types'

function ReadonlyCheckbox({
  checked,
  id,
  label,
  name
}: {
  checked: boolean
  id: string
  label: string
  name: string
}) {
  return (
    <Field orientation="horizontal">
      <Checkbox
        checked={checked}
        disabled
        id={id}
        name={name}
        value="true"
      />

      <FieldLabel htmlFor={id}>{label}</FieldLabel>
    </Field>
  )
}

export function ShowTeamPermissions({
  permissions
}: {
  permissions: TeamPermissions
}) {
  // i18n
  const { t } = useTranslation()

  return (
    <div className="grid gap-4">
      <ReadonlyCheckbox
        checked={permissions.admin}
        id="admin"
        label={t(($) => $.teamPermissions.admin)}
        name="admin"
      />

      <ReadonlyCheckbox
        checked={permissions.can_edit_team}
        id="can_edit_team"
        label={t(($) => $.teamPermissions.canEditTeam)}
        name="can_edit_team"
      />

      <ReadonlyCheckbox
        checked={permissions.can_delete_team}
        id="can_delete_team"
        label={t(($) => $.teamPermissions.canDeleteTeam)}
        name="can_delete_team"
      />

      <ReadonlyCheckbox
        checked={permissions.can_edit_members}
        id="can_edit_members"
        label={t(($) => $.teamPermissions.canEditMembers)}
        name="can_edit_members"
      />

      <ReadonlyCheckbox
        checked={permissions.can_edit_projects}
        id="can_edit_projects"
        label={t(($) => $.teamPermissions.canEditProjects)}
        name="can_edit_projects"
      />
    </div>
  )
}

export function EditTeamPermissions({
  profile,
  teamId
}: {
  profile: Profile & WithTeamPermissions
  teamId: number
}) {
  // i18n
  const { t } = useTranslation()

  const [isAdmin, setIsAdmin] = useState(profile.pivot.admin)

  return (
    <Form
      defaults={{
        admin: profile.pivot.admin ? 'true' : '',
        can_delete_team: profile.pivot.can_delete_team ? 'true' : '',
        can_edit_members: profile.pivot.can_edit_members ? 'true' : '',
        can_edit_projects: profile.pivot.can_edit_projects ? 'true' : '',
        can_edit_team: profile.pivot.can_edit_team ? 'true' : ''
      }}
      route={update({ profile: profile.id, team: teamId })}
      schema={updateTeamPermissionsSchema}
    >
      {({ form, loading }) => (
        <>
          <CheckboxField
            control={form.control}
            inputId="admin"
            inputName="admin"
            label={t(($) => $.teamPermissions.admin)}
            onCheckedChange={(checked) => {
              setIsAdmin(Boolean(checked))

              if (checked === true) {
                form.setValue('can_delete_team', 'true')
                form.setValue('can_edit_members', 'true')
                form.setValue('can_edit_projects', 'true')
                form.setValue('can_edit_team', 'true')
              }
            }}
          />

          <CheckboxField
            control={form.control}
            inputId="can_edit_team"
            inputName="can_edit_team"
            label={t(($) => $.teamPermissions.canEditTeam)}
            readOnly={isAdmin}
          />

          <CheckboxField
            control={form.control}
            inputId="can_delete_team"
            inputName="can_delete_team"
            label={t(($) => $.teamPermissions.canDeleteTeam)}
            readOnly={isAdmin}
          />

          <CheckboxField
            control={form.control}
            inputId="can_edit_members"
            inputName="can_edit_members"
            label={t(($) => $.teamPermissions.canEditMembers)}
            readOnly={isAdmin}
          />

          <CheckboxField
            control={form.control}
            inputId="can_edit_projects"
            inputName="can_edit_projects"
            label={t(($) => $.teamPermissions.canEditProjects)}
            readOnly={isAdmin}
          />

          <Submit
            className="w-36"
            label={t(($) => $.actions.save)}
            loading={loading}
            size="sm"
          />
        </>
      )}
    </Form>
  )
}

export function TeamPermissions({
  canEdit,
  profile,
  teamId
}: {
  canEdit: boolean
  profile: Profile & WithTeamPermissions
  teamId: number
}) {
  if (canEdit) {
    return (
      <EditTeamPermissions
        profile={profile}
        teamId={teamId}
      />
    )
  }

  return <ShowTeamPermissions permissions={profile.pivot} />
}
