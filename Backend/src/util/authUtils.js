import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import jsonwebtoken from 'jsonwebtoken';

const pathToKey = path.join('keyPair', 'id_rsa_priv.pem');
// const PUB_KEY = fs.readFileSync(pathToKey, 'utf8');
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8');
// At a minimum, you must pass the `jwtFromRequest` and `secretOrKey` properties

/**
 * -------------- HELPER FUNCTIONS ----------------
 */

/**
 *
 * @param {string} password - The plain text password
 * @param {string} hash - The hash stored in the database
 * @param {string} salt - The salt stored in the database
 * @returns {boolean} - Returns true if the password matches the hash and salt
 * This function uses the crypto library to decrypt the hash using the salt and then compares
 * the decrypted hash/salt with the password that the user provided at login
 */
export function validPassword(password, hash, salt) {
  const hashVerify = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');
  return hash === hashVerify;
}

/**
 * @description - This function takes a plain text password and creates a salt and hash out of it.  Instead of storing the plaintext
 * password in the database, the salt and hash are stored for security
 *
 * ALTERNATIVE: It would also be acceptable to just use a hashing algorithm to make a hash of the plain text password.
 * You would then store the hashed password in the database and then re-hash it to verify later (similar to what we do here)
 * @param {string} password - The plain text password
 * @returns {{salt:string, hash: string}} - Returns an object with the salt and hash
 */
export function genPassword(password) {
  const salt = crypto.randomBytes(32).toString('hex');
  const genHash = crypto
    .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
    .toString('hex');

  return {
    salt,
    hash: genHash,
  };
}

/**
 * @param {User} user - The user object.  We need this to set the JWT `sub` payload property to the MongoDB user ID.
 * @returns {{token: string, expires: string}} - Returns a JWT token
 */
export function issueJWT(user) {
  const { _id } = user;

  const expiresIn = '1d';

  const payload = {
    sub: _id,
    iat: Date.now(),
  };

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {
    expiresIn: '30',
    algorithm: 'RS256',
  });

  return {
    token: `Bearer ${signedToken}`,
    expires: expiresIn,
  };
}
