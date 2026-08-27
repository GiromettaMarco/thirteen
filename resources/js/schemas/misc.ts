import {
  InputEmailRule,
  InputNumberRule,
  InputTextRule,
  Schema
} from '@gmcode/forms'
import { ArrayRule } from '@gmcode/tsv-advanced'

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

export const deleteSchema = new Schema({})

export const massDeleteSchema = new Schema({
  ids: new ArrayRule()
})
