import User from './model';
import { genPassword, issueJWT, validPassword } from '../../util/authUtils';
import Logger from '../../util/logger';

const logger = Logger('User.service');

/**
 * description - user Login service function
 * @param {Request} req - request object
 * @returns {Object} - returns object
 */
export async function userLogin(req) {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) {
      throwApiError('username or password invalid', 401);
    }
    logger.debug(JSON.stringify(user._doc));
    // Function defined at bottom of app.js
    const isValid = validPassword(req.body.password, user.password, user.salt);

    if (isValid) {
      const tokenObject = issueJWT(user);
      return {
        success: true,
        token: tokenObject.token,
        expiresIn: tokenObject.expires,
      };
    }
    throwApiError('username or password invalid', 401);
  } catch (error) {
    throw error;
  }
}

/**
 * description - utility fuction for creating user
 * @param {Request} req - request object
 * @returns {Object} - returns object
 */
export async function registerUser(req) {
  const saltHash = genPassword(req.body.password);

  const { salt, hash } = saltHash;

  const newUser = new User({
    username: req.body.username,
    password: hash,
    salt,
  });

  try {
    await newUser.save();
    return { success: true };
  } catch (err) {
    throw err;
  }
}
