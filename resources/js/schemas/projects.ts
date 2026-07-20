import { description, name } from '@/schemas/misc'
import { InputRule, Schema } from '@gmcode/forms'

const deadline = new InputRule({ optional: true })

export const createProjectSchema = new Schema({
  deadline,
  description,
  name
})

export const updateProjectSchema = new Schema({
  deadline,
  description,
  name
})
