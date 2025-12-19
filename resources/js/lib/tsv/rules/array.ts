import { TsvMessage } from '@/lib/tsv/message'
import { AdvRule, type AdvRuleOptions, type ParseEmpty } from '@/lib/tsv/rule'

interface Messages {
  array: string
  required: string
}

type RuleOptions<
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> = AdvRuleOptions<Messages, O, PE>

/**
 * Validate as array.
 *
 * May be optional.
 */
export class FormArrayRule<
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'undefined'
> extends AdvRule<Array<string>, Messages, O, PE> {
  /**
   * Error messages.
   */
  messages

  constructor(options?: RuleOptions<O, PE>) {
    super(options)

    this.messages = Object.assign(
      {
        array: 'array',
        required: 'required'
      },
      options?.messages
    )
  }

  sanitize(value: unknown) {
    const trimmed = super.sanitize(value)

    if (typeof trimmed === 'string' && trimmed) {
      return trimmed.split(',')
    }

    return trimmed
  }

  test(value: unknown) {
    // Falsy
    if (!value) {
      if (this.optional) {
        return true
      }

      return new TsvMessage(this.messages.required)
    }

    // Not array
    if (!Array.isArray(value)) {
      return new TsvMessage(this.messages.array)
    }

    return true
  }
}
