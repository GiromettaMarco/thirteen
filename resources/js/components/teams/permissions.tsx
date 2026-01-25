import { CheckboxField, Form } from '@/components/form'
import { Checkbox } from '@/components/ui/checkbox'
import { Field, FieldLabel } from '@/components/ui/field'
import { Submit } from '@/components/ui/submit'
import { update } from '@/routes/members'
import { updateTeamPermissionsSchema } from '@/schemas/teams'
import type { Profile, TeamPermissions, WithTeamPermissions } from '@/types'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

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
        checked={permissions.can_edit}
        id="can_edit"
        label={t(($) => $.teamPermissions.canEdit)}
        name="can_edit"
      />

      <ReadonlyCheckbox
        checked={permissions.can_delete}
        id="can_delete"
        label={t(($) => $.teamPermissions.canDelete)}
        name="can_delete"
      />

      <ReadonlyCheckbox
        checked={permissions.can_add_members}
        id="can_add_members"
        label={t(($) => $.teamPermissions.canAddMembers)}
        name="can_add_members"
      />

      <ReadonlyCheckbox
        checked={permissions.can_edit_members}
        id="can_edit_members"
        label={t(($) => $.teamPermissions.canEditMembers)}
        name="can_edit_members"
      />

      <ReadonlyCheckbox
        checked={permissions.can_remove_members}
        id="can_remove_members"
        label={t(($) => $.teamPermissions.canRemoveMembers)}
        name="can_remove_members"
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
        can_add_members: profile.pivot.can_add_members ? 'true' : '',
        can_delete: profile.pivot.can_delete ? 'true' : '',
        can_edit: profile.pivot.can_edit ? 'true' : '',
        can_edit_members: profile.pivot.can_edit_members ? 'true' : '',
        can_remove_members: profile.pivot.can_remove_members ? 'true' : ''
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
                form.setValue('can_edit', 'true')
                form.setValue('can_delete', 'true')
                form.setValue('can_add_members', 'true')
                form.setValue('can_edit_members', 'true')
                form.setValue('can_remove_members', 'true')
              }
            }}
          />

          <CheckboxField
            control={form.control}
            inputId="can_edit"
            inputName="can_edit"
            label={t(($) => $.teamPermissions.canEdit)}
            readonly={isAdmin}
          />

          <CheckboxField
            control={form.control}
            inputId="can_delete"
            inputName="can_delete"
            label={t(($) => $.teamPermissions.canDelete)}
            readonly={isAdmin}
          />

          <CheckboxField
            control={form.control}
            inputId="can_add_members"
            inputName="can_add_members"
            label={t(($) => $.teamPermissions.canAddMembers)}
            readonly={isAdmin}
          />

          <CheckboxField
            control={form.control}
            inputId="can_edit_members"
            inputName="can_edit_members"
            label={t(($) => $.teamPermissions.canEditMembers)}
            readonly={isAdmin}
          />

          <CheckboxField
            control={form.control}
            inputId="can_remove_members"
            inputName="can_remove_members"
            label={t(($) => $.teamPermissions.canRemoveMembers)}
            readonly={isAdmin}
          />

          <Submit
            className="w-36"
            label={t(($) => $.save)}
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
