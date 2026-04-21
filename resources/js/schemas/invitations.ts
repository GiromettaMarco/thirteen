import { InputRule } from '@/lib/tsv/form/input'
import { InputSelectRule } from '@/lib/tsv/form/input-select'
import { Schema } from '@/lib/tsv/schema'
import { email, name } from '@/schemas/misc'

export const createInvitationSchema = new Schema({
  name,
  email,
  role: new InputSelectRule({
    options: ['guest', 'developer', 'designer', 'manager']
  }),
  teams: new InputRule()
})
