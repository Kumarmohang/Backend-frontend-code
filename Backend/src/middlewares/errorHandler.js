/* eslint-disable no-unused-vars */
import { CastError } from 'mongoose';
/**
 * @description - Error Handler
 * @param {Error | ApiError} err - Error
 * @param {any} _req - Request
 * @param {any} res - Response
 * @param {any} _next - Function
 * @returns {void}
 * */
export function errorHandler(err, _req, res, _next) {
  const error = {
    msg: err.message || 'Internal server error',
    status: err.status || 'failed',
    success: false,
    extraData: err.extraData,
  };
  let statusCode = err.statusCode || 500;
  if (err instanceof CastError) {
    error.msg = 'Invalid Object Id';
    error.success = false;
    statusCode = 400;
  }
  res.status(statusCode);
  res.json(error);
  // next;
}
