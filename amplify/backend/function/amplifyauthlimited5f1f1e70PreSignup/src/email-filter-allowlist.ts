import dotenv from 'dotenv'
import { PreSignUpTriggerEvent } from 'aws-lambda'
import AWS from 'aws-sdk'

const ssm = new AWS.SSM()

dotenv.config()

const getSecret = async (secretName: string): Promise<string | null> => {
  const secretPath = process.env[secretName]
  if (secretPath == null) return null
  const { Parameter } = await ssm.getParameter({
    Name: secretPath,
    WithDecryption: true
  }).promise()
  return Parameter?.Value ?? null
}

const ALLOWED_EMAIL_REGEX_LIST = (process.env.ALLOWED_EMAIL_REGEX_LIST ?? '').split(',').map((d) => d.trim())

exports.handler = async (event: PreSignUpTriggerEvent) => {
  const { email } = event.request.userAttributes

  const isAllowed = ALLOWED_EMAIL_REGEX_LIST.some((regex) => new RegExp(regex).test(email))

  throw new Error(JSON.stringify(process.env))

  if (!isAllowed) {
    throw new Error(`\nallowed email regex list: ${ALLOWED_EMAIL_REGEX_LIST.join(', ')}`)
  }

  return event
}
