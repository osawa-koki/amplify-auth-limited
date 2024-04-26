import dotenv from 'dotenv'
import { PreSignUpTriggerEvent } from 'aws-lambda'

dotenv.config()

const ALLOWED_EMAIL_REGEX_LIST = (process.env.ALLOWED_EMAIL_REGEX_LIST ?? '').split(',').map((d) => d.trim())

exports.handler = async (event: PreSignUpTriggerEvent) => {
  const { email } = event.request.userAttributes

  const isAllowed = ALLOWED_EMAIL_REGEX_LIST.some((regex) => new RegExp(regex).test(email))

  if (!isAllowed) {
    throw new Error(`\nallowed email regex list: ${ALLOWED_EMAIL_REGEX_LIST.join(', ')}`)
  }

  return event
}
