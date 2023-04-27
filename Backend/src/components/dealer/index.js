import { isNaN, parseInt } from 'lodash';
import { getDealers } from './service';

/**
 *@description - Dealer controller class
 */
export class DealerController {
  /**
   * description - dealer detail controller
   * @param {Request} req - request
   * @param {Response} res - response
   * @returns {void}
   */
  static getDealers = (req, res) => {
    try {
      const limit = parseInt(req.query.fetchSize || 10, 10);
      const pageNo = parseInt(req.query.pageNo || 0, 10);
      if (
        (!isNaN(parseInt(pageNo)) && !isNaN(parseInt(limit))) ||
        pageNo === undefined ||
        limit === undefined
      ) {
        getDealers(limit, pageNo)
          .then((result) => res.status(200).json(result))
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
  };
}
