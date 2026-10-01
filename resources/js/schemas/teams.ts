import { InputCheckboxRule, InputRule, Schema } from '@gmcode/forms/tsv'
import { name } from '@/schemas/misc'

export const createTeamSchema = new Schema({
  name
})

export const updateTeamSchema = new Schema({
  name
})

export const addTeamMemberSchema = new Schema({
  admin: new InputCheckboxRule(),
  can_delete_team: new InputCheckboxRule(),
  can_edit_members: new InputCheckboxRule(),
  can_edit_projects: new InputCheckboxRule(),
  can_edit_team: new InputCheckboxRule(),
  profile_id: new InputRule()
})

export const updateTeamPermissionsSchema = new Schema({
  admin: new InputCheckboxRule(),
  can_delete_team: new InputCheckboxRule(),
  can_edit_members: new InputCheckboxRule(),
  can_edit_projects: new InputCheckboxRule(),
  can_edit_team: new InputCheckboxRule()
})
