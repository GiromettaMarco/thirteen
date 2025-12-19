import { TsvMessage } from '@/lib/tsv/message'
import { AdvRule, type AdvRuleOptions, type ParseEmpty } from '@/lib/tsv/rule'

interface Messages {
  missing: string
  required: string
}

/**
 * Validate as on of a set of values.
 *
 * May be optional.
 */
export class OneOfRule<
  const T,
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'string'
> extends AdvRule<T, Messages, O, PE> {
  /**
   * Accepted values.
   */
  acceptedValues: T[]

  /**
   * Error messages.
   */
  messages: Messages

  constructor(acceptedValues: T[], options?: AdvRuleOptions<Messages, O, PE>) {
    super(options)

    this.acceptedValues = acceptedValues

    this.messages = Object.assign(
      {
        missing: 'missing',
        required: 'required'
      },
      options?.messages
    )
  }

  test(value: unknown) {
    // Falsy
    if (!value) {
      if (this.optional) {
        return true
      }

      return new TsvMessage(this.messages.required)
    }

    // Missing in array
    if (!this.acceptedValues.includes(value as T)) {
      return new TsvMessage(this.messages.missing)
    }

    return true
  }
}
