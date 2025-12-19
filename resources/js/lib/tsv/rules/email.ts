import { TsvMessage } from '@/lib/tsv/message'
import { emailRegex } from '@/lib/tsv/regex'
import { AdvRule, type AdvRuleOptions, type ParseEmpty } from '@/lib/tsv/rule'

interface Messages {
  email: string
  maxChars: string
  required: string
}

interface RuleOptions<
  O extends boolean | undefined,
  PE extends ParseEmpty | undefined
> extends AdvRuleOptions<Messages, O, PE> {
  /**
   * Maximum string length. `null` for no check.
   *
   * @defaultValue `255`
   */
  maxChars?: number | null
}

/**
 * Must be a valid email address.
 *
 * May be optional.
 */
export class EmailRule<
  O extends boolean | undefined = undefined,
  PE extends ParseEmpty | undefined = 'string'
> extends AdvRule<string, Messages, O, PE> {
  /**
   * Maximum string length. `null` for no check.
   *
   * @defaultValue `255`
   */
  maxChars: number | null

  /**
   * Error messages.
   */
  messages

  constructor({
    maxChars = 255,
    messages,
    optional,
    parseEmpty
  }: RuleOptions<O, PE> = {}) {
    super({ messages, optional, parseEmpty })

    this.maxChars = maxChars

    this.messages = Object.assign(
      {
        email: 'email',
        maxChars: 'maxChars',
        required: 'required'
      },
      messages
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

    // Not string
    if (typeof value !== 'string') {
      return new TsvMessage(this.messages.email)
    }

    // Char limit
    if (this.maxChars !== null && value.length > this.maxChars) {
      return new TsvMessage(this.messages.maxChars, {
        length: value.length,
        max: this.maxChars
      })
    }

    // Email regex
    if (!emailRegex.test(value)) {
      return new TsvMessage(this.messages.email)
    }

    return true
  }
}
