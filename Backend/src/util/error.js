/* eslint-disable no-unused-vars */
/**
 * @constructor -AppError.
 * @extends Error
 * @description - This Controller handles all the error.
 */
export class ApiError extends Error {
  /**
   * @description -App error constructor.
   * @param {string } message - Error Message.
   * @param {string | Number} statusCode - Error Response Code.
   * @param {any} extraData - Additional data for api.
   * @returns {void} .
   */
  constructor(message, statusCode, extraData = {}) {
    super(message);

    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.extraData = extraData;
    Error.captureStackTrace(this, this.constructor);
  }
}
globalThis.throwApiError = (...arg) => {
  throw new ApiError(...arg);
};
