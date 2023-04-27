import mongoose from 'mongoose';
import MongoStore from 'connect-mongo';
import cacheManager from 'cache-manager';
import mongooseStore from 'cache-manager-mongoose';

import Logger from '../logger';

const logger = Logger('MongoClient');

/**
 * @constructor MongoConnection
 * @description MongoDB connection class.
 * @property {function} createConnection - Creates a new MongoDB connection.
 * @property {function} closeConnection - Closes the MongoDB connection.
 * @property {mongoose} client mongoose - Mongoose instance.
 */
class MongoConnection {
  /**
   * @type {mongoose} client - Mongoose instance.
   * @static
   */
  static client = null;

  /**
   * @description Creates a new MongoDB connection.
   * @param {string} uri - MongoDB connection url.
   * @param {mongoose.ConnectOptions} options - MongoDB connection options.
   * @returns {mongoose} - Mongoose instance.
   */
  static async createConnection(uri, options = {}) {
    try {
      logger.verbose('Connecting to db');
      MongoConnection.client = await mongoose.connect(uri, options);
      await cacheManager.caching({
        store: mongooseStore,
        mongoose,
        ttl: 600,
      });
      logger.verbose('DB connected successfully');
      return MongoConnection.client;
    } catch (err) {
      logger.error(err);
      throw err;
    }
  }

  /**
   * @description Closes the MongoDB connection.
   * @returns {void}
   */
  static closeConnection() {
    logger.verbose('information log');
    MongoConnection.client.close();
  }
}

/**
 * @description Initializes MongoDB connection.
 * @param {string} url - MongoDB connection url.
 * @param {mongoose.ConnectOptions} options - MongoDB connection options.
 * @returns {mongoose} - Mongoose instance.
 */
async function initMongoConnection(url, options) {
  try {
    const db = await MongoConnection.createConnection(url, options);
    return db;
  } catch (error) {
    throw error;
  }
}
/**
 * @description Initializes MongoStore for use session.
 * @param {mongoose} client - Mongoose instance.
 * @param {uri} uri - MongoDB connection uri.
 * @returns {MongoStore} - MongoStore instance.
 */
function initSessionStore(client, uri) {
  const store = new MongoStore({
    clientPromise: client,
    mongoUrl: uri,
    collection: 'sessions',
  });
  return store;
}
/**
 * @description closes momgo connection
 * @returns {void} - returns void
 */

const mongoClient = MongoConnection.client;
export { initMongoConnection, mongoClient, initSessionStore };
