import { name } from '@/schemas/misc'
import { InputRule, Schema } from '@gmcode/forms'

export const updateProfileSchema = new Schema({
  name,
  public: new InputRule({ optional: true }),
  role: new InputRule()
})
