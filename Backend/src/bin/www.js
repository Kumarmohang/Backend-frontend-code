#!/usr/bin/env node
/* eslint-disable no-fallthrough */

/**
 * Module dependencies.
 */
import http from 'http';
// import mysql from 'mysql';
import config from '../config';
import Logger from '../util/logger';
import app from '../app';
import { initMongoConnection, initSessionStore } from '../util/mongoClient';
import { initSqlConnection } from '../util/sqlClent';

const logger = Logger('bin/www');

/**
 * @description Event listener for HTTP server "listening" event.
 * @param {http.Server} serverInstance - Created Server instance.
 * @returns {void}
 */
export function onListening(serverInstance) {
  const addr = serverInstance.address();
  // const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
  logger.info(`Listening on http://${addr.address}:${addr.port}`);
}

/**
 * @description Normalize a port into a number, string, or false.
 * @param {string} val - Port number.
 * @returns {number | false} - Port number or false.
 */
export function normalizePort(val) {
  const port = parseInt(val, 10);

  if (Number.isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }

  return false;
}

/**
 * @description Event listener for HTTP server "error" event.
 * @param {Error} error - Error object.
 * @param {string | number} port - Port number.
 * @returns {void}
 */
export function onError(error, port) {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      logger.error(`${bind} requires elevated privileges`);
      process.exit(1);
    case 'EADDRINUSE':
      logger.error(`${bind} is already in use`);
      process.exit(1);
    default:
      throw error;
  }
}
export let server;
/**
 * description - start sever
 * @returns {void} - returns void
 */
export async function startSever() {
  await initSqlConnection();
  initMongoConnection(config.DB_URI).then((mongoClient) => {
    initSessionStore(mongoClient, config.DB_URI);
    // initSqlConnection();
    /**
     * Get port from environment and store in Express.
     */
    const port = normalizePort(config.PORT);
    app.set('port', port);
    app.set('host', config.HOST);
    /**
     * Create HTTP server.
     */
    server = http.createServer(app);

    logger.verbose('Starting server');

    /**
     * Listen on provided port, on all network interfaces.
     */
    server.listen(port, config.HOST);
    server.on('error', (error) => onError(error, port));
    server.on('listening', () => onListening(server));

    //   .then((res) => res)
    //   .catch((err) => {
    //     logger.error('SQL connection error');
    //     logger.error(err);
    //   });
  });
}
startSever();
