import {
  current_password,
  password,
  password_confirmation,
  passwordMatch
} from '@/schemas/auth'
import { email } from '@/schemas/misc'
import { Schema } from '@gmcode/forms'

export const updateAccountSchema = new Schema({
  email
})

export const updatePasswordSchema = new Schema(
  {
    current_password,
    password,
    password_confirmation
  },
  {
    postValidation: [passwordMatch]
  }
)
