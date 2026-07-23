import { InputRule, Schema } from '@gmcode/forms'
import { name } from '@/schemas/misc'

export const updateProfileSchema = new Schema({
  name,
  public: new InputRule({ optional: true }),
  role: new InputRule()
})
