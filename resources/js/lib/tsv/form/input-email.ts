import {
  InputRule,
  inputRuleMessages,
  type InputRuleOptions
} from '@/lib/tsv/form/input'
import { TsvMessage } from '@/lib/tsv/message'
import { emailRegex } from '@/lib/tsv/regex'

const defaultMessages = {
  ...inputRuleMessages,
  email: 'email',
  maxChars: 'maxChars'
}

interface RuleOptions<
  TOptional extends boolean | undefined
> extends InputRuleOptions<TOptional, typeof defaultMessages> {
  /**
   * Maximum string length. `null` for no check.
   *
   * @defaultValue `255`
   */
  maxChars?: number | null
}

/**
 * Validation for an HTML input email field.
 */
export class InputEmailRule<
  TOptional extends boolean | undefined = undefined
> extends InputRule<TOptional> {
  /**
   * Maximum string length. `null` for no check.
   *
   * @defaultValue `255`
   */
  maxChars: number | null

  /**
   * Error messages.
   */
  messages: typeof defaultMessages

  constructor({
    maxChars = 255,
    messages,
    optional
  }: RuleOptions<TOptional> = {}) {
    super({ optional })

    this.messages = { ...defaultMessages, ...messages }

    this.maxChars = maxChars
  }

  test(value: string | null) {
    // Falsy
    if (!value) {
      return this.isFalsyResponse()
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
