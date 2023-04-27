// import passport from 'passport';
import { userLogin, registerUser } from './service';

/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 *
 */

/**
 * @constructor UserController
 * @description - This Controller handles all the requests regarding the user authentication and registration
 */
export class UserController {
  /**
   * @description - Login a user.  This function takes the username and password from the request body.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @param {NextFunction} next - The next function.
   * @returns {void}
   */
  loginUser(req, res, next) {
    // console.log(req);
    userLogin(req)
      .then((result) => {
        // console.log(result);
        res.status(201).json({ data: result });
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
   * @description - Register a user.
   * @param {Request} req - The request object.
   * @param {Response} res - The response object.
   * @returns {void}
   */
  createUser(req, res) {
    registerUser(req)
      .then((result) => {
        res.status(201).json({ data: result });
      })
      .catch((err) => {
        throw err;
      });
  }
}

export default new UserController();
