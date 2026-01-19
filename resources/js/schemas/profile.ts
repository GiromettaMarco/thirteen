import { InputRule } from '@/lib/tsv/form/input'
import { Schema } from '@/lib/tsv/schema'
import { name } from '@/schemas/misc'

export const updateProfileSchema = new Schema({
  name,
  public: new InputRule(),
  role: new InputRule()
})
