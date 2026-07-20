import { email, name } from '@/schemas/misc'
import {
  InputCheckboxRule,
  InputTextRule,
  Message,
  Schema
} from '@gmcode/forms'

//#region Fields
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

//#region Post Validation
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

    return new Message('confirmPassword.match')
  }
}

//#region Schemas
export const loginSchema = new Schema({
  email,
  password,
  remember: new InputCheckboxRule()
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

export const passwordConfirmSchema = new Schema({
  password
})

export const forgotPasswordSchema = new Schema({
  email
})

export const resetPasswordSchema = new Schema(
  {
    email,
    password,
    password_confirmation,
    token: new InputTextRule({
      messages: {
        required: 'token.required'
      }
    })
  },
  {
    postValidation: [passwordMatch]
  }
)
