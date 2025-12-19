import {
  InputRule,
  inputRuleMessages,
  type InputRuleOptions
} from '@/lib/tsv/form/input'
import { TsvMessage } from '@/lib/tsv/message'
import { hexColorRegex } from '@/lib/tsv/regex'

const defaultMessages = {
  ...inputRuleMessages,
  color: 'color'
}

/**
 * Validation for an HTML input color field.
 */
export class InputColorRule<
  TOptional extends boolean | undefined = undefined
> extends InputRule<TOptional> {
  /**
   * Error messages.
   */
  messages: typeof defaultMessages

  constructor({
    messages,
    optional
  }: InputRuleOptions<TOptional, typeof defaultMessages> = {}) {
    super({ optional })

    this.messages = { ...defaultMessages, ...messages }
  }

  test(value: string | null) {
    // Falsy
    if (!value) {
      return this.isFalsyResponse()
    }

    // Hex color regex
    if (!hexColorRegex.test(value)) {
      return new TsvMessage(this.messages.color)
    }

    return true
  }
}
