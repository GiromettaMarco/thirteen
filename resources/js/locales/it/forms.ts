import { it } from '@gmcode/forms/locales'

export default {
  ...it,
  confirmPassword: {
    match: 'Le password non corrispondono',
    required: 'Il campo Conferma Password è obbligatorio.'
  },
  currentPassword: {
    required: 'Il campo Password Attuale è obbligatorio.'
  },
  emailCustom: {
    email: 'Si prega di inserire un indirizzo email valido.',
    maxChars: "L'email non può contenere più di 255 caratteri.",
    required: 'Il campo Email è obbligatorio.'
  },
  language: {
    invalid: 'Valore non supportato.'
  },
  name: {
    required: 'Il campo Nome è obbligatorio.'
  },
  password: {
    length: 'La password deve essere lunga almeno 12 caratteri.',
    mixed:
      'La password deve contenere almeno un carattere maiuscolo ed un carattere minuscolo.',
    number: 'La password deve contenere almeno un numero.',
    required: 'Il campo Password è obbligatorio.',
    symbol: 'La password deve contenere almeno un simbolo.'
  },
  search: {
    minChars: 'Inserisci almeno 3 caratteri.'
  },
  token: {
    required: 'Il campo Token è obbligatorio.'
  }
} as const
