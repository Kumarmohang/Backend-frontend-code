import { ApiError } from '../../util/error';
import { getAllCar, getAllSeries, getAnalyticalData } from './service';

/**
 *@description - Club controller class
 */
export class CarController {
  /**
   * description - analytics detail controller
   * @param {Request} req - request
   * @param {Response} res - response
   * @param {NextFunction} next - next function
   * @returns {void}
   */
  static getAnalyticalData = (req, res, next) => {
    getAnalyticalData()
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.trace(err);
        next(err);
      });
  };

  /**
   * @description - get all clubs function
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - next function
   * @returns {void}
   */
  static getAllCars(req, res, next) {
    const { query } = req;
    const { pageNo = 0, fetchSize = 10 } = query;
    // console.log(isNaN(parseInt(pageNo)) && isNaN(parseInt(fetchSize)));
    if (
      !Number.isNaN(parseInt(pageNo, 10)) &&
      !Number.isNaN(parseInt(fetchSize, 10))
    ) {
      getAllCar(query)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      next(new ApiError('PageNo and fetchSize must be a number', '400'));
    }
  }

  /**
   * @description - get all clubs function
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - next function
   * @returns {void}
   */
  static getSeries(req, res, next) {
    const { query } = req;
    const { pageNo = 0, fetchSize = 10 } = query;
    // console.log(isNaN(parseInt(pageNo)) && isNaN(parseInt(fetchSize)));
    if (
      !Number.isNaN(parseInt(pageNo, 10)) &&
      !Number.isNaN(parseInt(fetchSize, 10))
    ) {
      getAllSeries(query)
        .then((data) => {
          res.status(200).json(data);
        })
        .catch((err) => {
          next(err);
        });
    } else {
      next(new ApiError('PageNo and fetchSize must be a number', '400'));
    }
  }
}
