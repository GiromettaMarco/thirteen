import { InputEmailRule } from '@/lib/tsv/form/input-email'
import { InputNumberRule } from '@/lib/tsv/form/input-number'
import { InputTextRule } from '@/lib/tsv/form/input-text'

// ======================================================================
//#region FIELDS
// ======================================================================

export const name = new InputTextRule({
  messages: {
    maxChars: 'name.maxChars',
    required: 'name.required'
  }
})

export const description = new InputTextRule({
  maxChars: 5000,
  optional: true
})

export const email = new InputEmailRule({
  messages: {
    email: 'emailCustom.email',
    maxChars: 'emailCustom.maxChars',
    required: 'emailCustom.required'
  }
})

export const user_id = new InputNumberRule()

// ======================================================================
//#region SCHEMAS
// ======================================================================

// export const deleteManySchema = new Schema({
//   ids: new FormArrayRule()
// })
