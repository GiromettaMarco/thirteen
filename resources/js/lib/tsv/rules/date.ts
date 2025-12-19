import { TsvMessage } from '@/lib/tsv/message'
import { AdvRule, type AdvRuleOptions, type ParseEmpty } from '@/lib/tsv/rule'

interface Messages {
  date: string
  required: string
}

/**
 * Value must be a javascript Date object or it must produce a valide date
 * throught the Date() constructor.
 *
 * May be optional.
 */
export class DateRule<
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'string'
> extends AdvRule<Date, Messages, O, PE> {
  /**
   * Error messages.
   */
  messages

  constructor(options?: AdvRuleOptions<Messages, O, PE>) {
    super(options)

    this.parseEmpty = options?.parseEmpty ?? 'string'

    this.messages = Object.assign(
      {
        date: 'date',
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

    // Date
    if (value instanceof Date) {
      if (isNaN(value.valueOf())) {
        return new TsvMessage(this.messages.date)
      }

      return true
    }

    // String or number
    if (typeof value === 'string' || typeof value === 'number') {
      const newDate = new Date(value)

      if (isNaN(newDate.valueOf())) {
        return new TsvMessage(this.messages.date)
      }

      return true
    }

    // Everything else
    return new TsvMessage(this.messages.date)
  }
}
