/* eslint-disable no-unused-vars */
import { createLogger, format, transports, Logger } from 'winston';
import DailyRotateFile from 'winston-daily-rotate-file';
import _ from 'lodash';
import config from '../../config';

const { LOG_LEVEL = 'debug', PROJECT_NAME = 'HDFC' } = config;

/**
 * Format given logger object to string.
 *
 * @param {string} moduleName - Name of module.
 * @param {object} info - Log information object.
 * @returns {string} Formated log information.
 */
const formatParams = (moduleName, info) => {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp;

  return `${PROJECT_NAME} : ${moduleName} - ${ts} ${level}: ${_.trim(
    message
  )} ${Object.keys(args).length ? JSON.stringify(args, '', '') : ''}`;
};
/**
 * Format given logger object to string.
 *
 * @param {string} moduleName - Name of module.
 * @param {object} info - Log information object.
 * @returns {string} Formated log information.
 */
const jsonFormatParams = (moduleName, info) => {
  const { timestamp, level, message, ...args } = info;
  const ts = timestamp;

  return JSON.stringify({
    module: moduleName,
    message: _.trim(message),
    timestamp: ts,
    level,
    extra: args,
  });
};
/**
 *
 * @param {string} moduleName - Name of module.
 * @returns {format} Return formatter.
 */
const fileFormat = (moduleName) =>
  format.combine(
    format.timestamp(),
    format.align(),
    format.errors({ stack: true }),
    format.printf((info) => jsonFormatParams(moduleName, info))
  );

/**
 *
 * @param {string} moduleName - Name of module.
 * @returns {format} Return formatter.
 */
const consoleFormat = (moduleName) =>
  format.combine(
    format.colorize(),
    format.timestamp(),
    format.align(),
    format.printf((info) => formatParams(moduleName, info))
  );

const fileLogging = [
  new DailyRotateFile({
    level: 'debug',
    filename: 'debug.log',
    maxSize: '150m',
    dirname: `./logs`,
    prepend: true,
    colorize: true,
    zippedArchive: true,
    handleExceptions: true,
  }),
  new DailyRotateFile({
    level: 'info',
    filename: 'info.log',
    maxSize: '150m',
    dirname: `./logs`,
    prepend: true,
    colorize: true,
    zippedArchive: true,
    handleExceptions: true,
  }),
  new DailyRotateFile({
    level: 'error',
    filename: 'error.log',
    maxSize: '150m',
    dirname: `./logs`,
    prepend: true,
    colorize: true,
    zippedArchive: true,
    handleExceptions: true,
  }),
];

/* const esTransportOpts = {
  level: LOG_LEVEL,
  transformer: esTransformer,
  clientOpts: { node: LOG_SERVER_URL },
}; */

/**
 *
 * @param {string} moduleName - Name of module.
 * @returns {Logger} Return Logger.
 */
const logger = (moduleName) => {
  const transaports = [
    // ...fileLogging,
    new transports.Console({
      format: consoleFormat(moduleName),
    }),
    //
  ];

  return createLogger({
    level: LOG_LEVEL,
    format: fileFormat(moduleName),
    transports: transaports,
    exitOnError: false, // don't crush no error
  });
};

export default logger;
