import { parseInt, isNaN } from 'lodash';
import { getAllCircuits, getFormattedCircuitDetails } from './service';

/**
 *@description - Club controller class
 */
export class CircuitController {
  /**
   * description - club detail controller
   * @param {Request} req - request
   * @param {Response} res - response
   * @param {NextFunction} next - next function
   *
   * @returns {void}
   */
  static getDetail = (req, res, next) => {
    // const { id } = req.query;
    // const clubName = req.query.name;
    // const getDetails = id ? getClubById(id) : getClubByName(clubName);
    getFormattedCircuitDetails(req)
      .then((result) => res.json(result))
      .catch((err) => {
        next(err);
      });
  };

  /**
   * @description - get all clubs function
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @returns {void}
   */
  static circuits(req, res) {
    try {
      const { query } = req;
      const { pageNo, fetchSize } = query;
      // console.log(isNaN(parseInt(pageNo)) && isNaN(parseInt(fetchSize)));
      if (
        (!isNaN(parseInt(pageNo)) && !isNaN(parseInt(fetchSize))) ||
        pageNo === undefined ||
        fetchSize === undefined
      ) {
        getAllCircuits(req.query)
          .then((data) => {
            res.status(200).json(data);
          })
          .catch((err) => {
            if (err.message === 'BAD_REQUEST') {
              throwApiError('BAD_REQUEST', '400');
            } else {
              throwApiError('Server Error', '500');
            }
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

    // res.json({ data: getNewsData() });
  }
}
