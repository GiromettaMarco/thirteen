import { InputRule } from '@/lib/tsv/form/input'
import { InputTextRule } from '@/lib/tsv/form/input-text'
import { TsvMessage } from '@/lib/tsv/message'
import { Schema } from '@/lib/tsv/schema'
import { email, name } from '@/schemas/misc'

// ======================================================================
//#region FIELDS
// ======================================================================

export const current_password = new InputTextRule({
  minChars: 8,
  messages: {
    minChars: 'password.length',
    required: 'currentPassword.required'
  }
})

export const password = new InputTextRule({
  minChars: 8,
  messages: {
    minChars: 'password.length',
    required: 'password.required'
  }
})

export const password_confirmation = new InputTextRule({
  minChars: 8,
  messages: {
    minChars: 'password.length',
    required: 'confirmPassword.required'
  }
})

// ======================================================================
//#region POST VALIDATION
// ======================================================================

export const passwordMatch = {
  addTo: 'password_confirmation' as const,
  callback({
    password,
    password_confirmation
  }: {
    password: string
    password_confirmation: string
  }) {
    if (password === password_confirmation) {
      return true
    }

    return new TsvMessage('confirmPassword.match')
  }
}

// ======================================================================
//#region SCHEMAS
// ======================================================================

export const loginSchema = new Schema({
  email,
  password,
  remember: new InputRule({ optional: true })
})

export const registerSchema = new Schema(
  {
    email,
    name,
    password,
    password_confirmation
  },
  {
    postValidation: [passwordMatch]
  }
)
