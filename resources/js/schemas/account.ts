import { Schema } from '@gmcode/forms'
import {
  current_password,
  new_password,
  password_confirmation,
  passwordMatch
} from '@/schemas/auth'
import { email } from '@/schemas/misc'

export const updateAccountSchema = new Schema({
  email
})

export const updatePasswordSchema = new Schema(
  {
    current_password,
    password: new_password,
    password_confirmation
  },
  {
    postValidation: [passwordMatch]
  }
)
