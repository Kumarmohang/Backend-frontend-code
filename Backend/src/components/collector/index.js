import { isNaN, parseInt } from 'lodash';
import {
  getAllCollectors,
  getCollector,
  getCollectorDetailFormatter,
} from './service';
/**
 * @description - CollectorController Class
 */
export class CollectorController {
  /**
   * @description - All collectores get function
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @returns {void} - returns void
   */
  static getCollectors(req, res) {
    try {
      const { query } = req;
      const { pageNo, fetchSize } = query;
      // console.log(isNaN(parseInt(pageNo)) && isNaN(parseInt(fetchSize)));
      if (
        (!isNaN(parseInt(pageNo)) && !isNaN(parseInt(fetchSize))) ||
        pageNo === undefined ||
        fetchSize === undefined
      ) {
        getAllCollectors(req)
          .then((data) => {
            res.status(200).json(data);
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

    /* ------------------------------- */
  }

  /**
   * @description - collector details controller
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {NextFunction} next - next function
   * @returns {void} - returns void
   */
  static getDetails(req, res, next) {
    const { id } = req.query;
    getCollector(id)
      .then((result) => {
        res.json({ data: getCollectorDetailFormatter(result) });
      })
      .catch((err) => {
        next(err);
      });
  }
}
