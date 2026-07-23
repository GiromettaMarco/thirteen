import { InputRule, Schema } from '@gmcode/forms'
import { description, name } from '@/schemas/misc'

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
