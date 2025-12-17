import type validations from '@/locales/en/validations'

export default {
  array: 'Il campo deve essere un array.',
  confirmPassword: {
    match: 'Le password non corrispondono',
    required: 'Il campo Conferma Password è obbligatorio.'
  },
  currentPassword: {
    required: 'Il campo Password Attuale è obbligatorio.'
  },
  date: 'Il campo deve essere una data valida',
  email: 'Il campo deve essere un indirizzo email valido.',
  emailCustom: {
    email: 'Si prega di inserire un indirizzo email valido.',
    maxChars: "L'email non può contenere più di 255 caratteri.",
    required: 'Il campo Email è obbligatorio.'
  },
  general: {
    invalid: 'Valore non supportato.'
  },
  integer: 'Il campo deve essere un numero intero.',
  language: {
    invalid: 'Valore non supportato.'
  },
  maxChars: 'Il campo non può contenere più di {{max}} caratteri.',
  maxValue: 'Il campo non può essere superiore a {{max}}.',
  minChars: 'Il campo deve contenere almeno {{min}} caratteri.',
  minValue: 'Il campo deve essere almeno {{min}}.',
  missing: 'Il valore non è supportato.',
  name: {
    required: 'Il campo Nome è obbligatorio.'
  },
  number: 'Il campo deve essere un numero.',
  numeric: 'Il campo deve essere un numero.',
  password: {
    length: 'La password deve essere lunga almeno 8 caratteri.',
    required: 'Il campo Password è obbligatorio.'
  },
  required: 'Il campo è obbligatorio.',
  string: 'Il campo deve essere una stringa.',
  token: {
    required: 'Il campo Token è obbligatorio.'
  }
} satisfies typeof validations
