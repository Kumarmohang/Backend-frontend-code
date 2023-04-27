import { ApiError } from '../../util/error';
import {
  createSuggestion,
  getAllSuggestions,
  updateSuggestion,
} from './service';

/**
 *@description - Suggestion controller class
 */
export class SuggestionController {
  /**
   * @description - get all suggestion function
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - next function
   * @returns {void}
   */
  static getAllSuggestion(req, res, next) {
    const { query } = req;
    const { pageNo = 0, fetchSize = 10 } = query;
    // console.log(isNaN(parseInt(pageNo)) && isNaN(parseInt(fetchSize)));
    if (
      !Number.isNaN(parseInt(pageNo, 10)) &&
      !Number.isNaN(parseInt(fetchSize, 10))
    ) {
      getAllSuggestions(query)
        .then((data) => {
          res.status(200).json({ data });
        })
        .catch((err) => {
          console.trace({ err });
          next(err);
        });
    } else {
      next(new ApiError('PageNo and fetchSize must be a number', '400'));
    }
  }

  /**
   * @description - get all suggestion function
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - next function
   * @returns {void}
   */
  static createNewSuggestion(req, res, next) {
    const { body, user } = req;
    // console.log(isNaN(parseInt(pageNo)) && isNaN(parseInt(fetchSize)));
    createSuggestion(body, user)
      .then((data) => {
        res.status(201).json({ data });
      })
      .catch((err) => {
        next(err);
      });
  }

  /**
   * @description - get all suggestion function
   * @param {Request} req - Request
   * @param {Response} res - Response
   * @param {NextFunction} next - next function
   * @returns {void}
   */
  static updateExistingSuggestion(req, res, next) {
    const { body } = req;
    // console.log(isNaN(parseInt(pageNo)) && isNaN(parseInt(fetchSize)));
    updateSuggestion(body)
      .then((data) => {
        res.status(200).json({ data });
      })
      .catch((err) => {
        next(err);
      });
  }
}
