import { InputNumberRule } from '@/lib/tsv/form/input-number'
import { InputSelectRule } from '@/lib/tsv/form/input-select'
import { Schema } from '@/lib/tsv/schema'
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
  profile_id,
  priority,
  status
})
