// import { ApiError } from '../../util/error';
import { predictValuation } from './service';

/**
 *@description - Club controller class
 */
export class ValuationController {
  /**
   * @description - get all clubs function
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - next function
   * @returns {void}
   */
  static getCarValuation(req, res, next) {
    predictValuation(req.body)
      .then((result) => {
        res.status(200).json(result);
      })
      .catch((err) => {
        next(err);
      });
  }
}
