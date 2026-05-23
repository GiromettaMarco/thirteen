import { InputRule } from '@/lib/tsv/form/input'
import { Schema } from '@/lib/tsv/schema'
import { name } from '@/schemas/misc'

export const createTeamSchema = new Schema({
  name
})

export const updateTeamSchema = new Schema({
  name
})

export const updateTeamPermissionsSchema = new Schema({
  admin: new InputRule(),
  can_edit: new InputRule(),
  can_delete: new InputRule(),
  can_edit_members: new InputRule(),
  can_edit_projects: new InputRule()
})
