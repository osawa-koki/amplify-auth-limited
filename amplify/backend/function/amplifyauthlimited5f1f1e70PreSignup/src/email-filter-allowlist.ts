// @ts-nocheck

/**
 * @type {import('@types/aws-lambda').PreSignUpTriggerHandler}
 */
exports.handler = async (event) => {
  const allowedEmailRegexList = process.env.ALLOWEDEMAILREGEXLIST.split(',').map((d) => d.trim());

  const { email } = event.request.userAttributes;

  const isAllowed = allowedEmailRegexList.some((regex) => new RegExp(regex).test(email));

  if (!isAllowed) {
    throw new Error('Email address is not allowed');
  }

  return event;
};
