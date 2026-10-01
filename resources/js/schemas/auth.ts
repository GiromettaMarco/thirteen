import {
  InputCheckboxRule,
  InputPasswordRule,
  InputTextRule,
  Message,
  Schema
} from '@gmcode/forms/tsv'
import { email, name } from '@/schemas/misc'

//#region Fields
export const current_password = new InputTextRule({
  messages: {
    minChars: 'password.length',
    required: 'currentPassword.required'
  }
})

export const new_password = new InputPasswordRule({
  messages: {
    hasMixed: 'password.mixed',
    hasNumber: 'password.number',
    hasSymbol: 'password.symbol',
    minChars: 'password.length',
    required: 'password.required'
  }
})

export const password = new InputTextRule({
  messages: {
    minChars: 'password.length',
    required: 'password.required'
  }
})

export const password_confirmation = new InputTextRule({
  messages: {
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
    password: new_password,
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
    password: new_password,
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
