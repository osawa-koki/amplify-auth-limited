// @ts-nocheck

import dotenv from 'dotenv';

dotenv.config();

const ALLOWED_EMAIL_REGEX_LIST = process.env.ALLOWED_EMAIL_REGEX_LIST.split(',').map((d) => d.trim());

/**
 * @type {import('@types/aws-lambda').PreSignUpTriggerHandler}
 */
exports.handler = async (event) => {
  const allowedEmailRegexList = process.env.ALLOWEDEMAILREGEXLIST.split(',').map((d) => d.trim());

  const { email } = event.request.userAttributes;

  const isAllowed = allowedEmailRegexList.some((regex) => new RegExp(regex).test(email));

  if (!isAllowed) {
    throw new Error(ALLOWED_EMAIL_REGEX_LIST.join(', ') + ' are the only allowed domains');
  }

  return event;
};
