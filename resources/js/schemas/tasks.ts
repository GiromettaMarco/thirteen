import { InputNumberRule, InputSelectRule, Schema } from '@gmcode/forms/tsv'
import { description, name } from '@/schemas/misc'

const label = new InputSelectRule({
  optional: true,
  options: ['bug', 'documentation', 'feature']
})

const profile_id = new InputNumberRule({ optional: true })

const priority = new InputSelectRule({
  options: ['low', 'medium', 'high']
})

const status = new InputSelectRule({
  options: ['backlog', 'todo', 'in_progress', 'done', 'canceled']
})

export const createTaskSchema = new Schema({
  description,
  label,
  name,
  priority,
  profile_id,
  status
})

export const updateTaskSchema = new Schema({
  description,
  label,
  name,
  priority,
  profile_id,
  status
})
