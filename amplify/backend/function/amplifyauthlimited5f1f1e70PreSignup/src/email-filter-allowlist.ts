// @ts-nocheck

import dotenv from 'dotenv';

dotenv.config();

const ALLOWED_EMAIL_REGEX_LIST = process.env.ALLOWED_EMAIL_REGEX_LIST.split(',').map((d) => d.trim());

/**
 * @type {import('@types/aws-lambda').PreSignUpTriggerHandler}
 */
exports.handler = async (event) => {
  const { email } = event.request.userAttributes;

  const isAllowed = ALLOWED_EMAIL_REGEX_LIST.some((regex) => new RegExp(regex).test(email));

  if (!isAllowed) {
    throw new Error(`\nallowed email regex list: ${ALLOWED_EMAIL_REGEX_LIST.join(', ')}`);
  }

  return event;
};
