export default {
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
    length: 'The password must be at least 8 characters long.',
    required: 'The Password field is required.'
  },
  token: {
    required: 'The Token field is required.'
  }
} as const
