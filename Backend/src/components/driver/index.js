import { parseInt, isNaN } from 'lodash';
import { getAllDriver, getFormattedDriverById } from './service';
/**
 * @typedef {import('express').Request} Request
 * @typedef {import('express').Response} Response
 * @typedef {import('express').NextFunction} NextFunction
 *
 */

/**
 * @constructor DriverController
 * @description - This Controller handles all the requests regarding the drivers
 */
export class DriverController {
  /**
   * @description - This method handles the request to get all the drivers
   * @param {Request} req - The request object
   * @param {Response} res - The response object
   * @returns {void}
   */
  static getAllDrivers(req, res) {
    try {
      const { query } = req;
      const { pageNo, fetchSize } = query;
      // console.log(isNaN(parseInt(pageNo)) && isNaN(parseInt(fetchSize)));
      if (
        (!isNaN(parseInt(pageNo)) && !isNaN(parseInt(fetchSize))) ||
        pageNo === undefined ||
        fetchSize === undefined
      ) {
        getAllDriver(req.query)
          .then((result) => {
            res.json(result);
          })
          .catch((err) => {
            throw err;
          });
      } else {
        throwApiError('BAD_REQUEST', '400');
      }
    } catch (error) {
      if (error.message === 'BAD_REQUEST') {
        throwApiError('BAD_REQUEST', '400');
      } else {
        throwApiError('Server Error', '500');
      }
    }
  }

  /**
   * description - club detail controller
   * @param {Request} req - request
   * @param {Response} res - response
   * @param {NextFunction} next - next function
   *
   * @returns {void}
   */
  static getDetail = (req, res, next) => {
    getFormattedDriverById(req.query)
      .then((result) => res.json(result))
      .catch((err) => {
        next(err);
      });
  };
}
