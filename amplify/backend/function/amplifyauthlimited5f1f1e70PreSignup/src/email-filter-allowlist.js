"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
/**
 * @type {import('@types/aws-lambda').PreSignUpTriggerHandler}
 */
exports.handler = (event) => __awaiter(void 0, void 0, void 0, function* () {
    // allowed domains
    const ald = process.env.DOMAINALLOWLIST.split(',').map((d) => d.trim());
    const { email } = event.request.userAttributes;
    const domain = email.substring(email.indexOf('@') + 1);
    if (!ald.includes(domain)) {
        throw new Error(`Invalid email domain: ${domain}`);
    }
    return event;
});
