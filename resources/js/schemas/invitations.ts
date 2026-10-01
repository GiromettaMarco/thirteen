import { InputRule, InputSelectRule, Schema } from '@gmcode/forms/tsv'
import { email, name } from '@/schemas/misc'

export const createInvitationSchema = new Schema({
  email,
  name,
  role: new InputSelectRule({
    options: ['guest', 'developer', 'designer', 'manager']
  }),
  teams: new InputRule()
})
