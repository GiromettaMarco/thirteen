import { en } from '@gmcode/forms/locales'

export default {
  ...en,
  confirmPassword: {
    match: 'The passwords did not match',
    required: 'Confirm Password is required.'
  },
  currentPassword: {
    required: 'Current Password is required.'
  },
  emailCustom: {
    email: 'Please enter a valid email.',
    maxChars: 'The email cannot exceed 255 characters.',
    required: 'The Email field is required.'
  },
  language: {
    invalid: 'Unsupported value.'
  },
  name: {
    required: 'The Name field is required.'
  },
  password: {
    length: 'The password must be at least 12 characters long.',
    mixed:
      'The password must contain at least one uppercase and one lowercase letter.',
    number: 'The password must contain at least one number.',
    required: 'The Password field is required.',
    symbol: 'The password must contain at least one symbol.'
  },
  search: {
    minChars: 'Please enter at least 3 characters.'
  },
  token: {
    required: 'The Token field is required.'
  }
} as const
