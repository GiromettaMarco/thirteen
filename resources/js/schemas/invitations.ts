import { email, name } from '@/schemas/misc'
import { InputRule, InputSelectRule, Schema } from '@gmcode/forms'

export const createInvitationSchema = new Schema({
  name,
  email,
  role: new InputSelectRule({
    options: ['guest', 'developer', 'designer', 'manager']
  }),
  teams: new InputRule()
})
