import { InputRule, Schema } from '@gmcode/forms'
import { name } from '@/schemas/misc'

export const createTeamSchema = new Schema({
  name
})

export const updateTeamSchema = new Schema({
  name
})

export const updateTeamPermissionsSchema = new Schema({
  admin: new InputRule(),
  can_delete_team: new InputRule(),
  can_edit_members: new InputRule(),
  can_edit_projects: new InputRule(),
  can_edit_team: new InputRule()
})
