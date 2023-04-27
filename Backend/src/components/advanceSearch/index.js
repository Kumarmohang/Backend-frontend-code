import { ApiError } from '../../util/error';
import { getAllCar } from './service';

/**
 *@description - Club controller class
 */
export class AdvancerSeachController {
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
}
