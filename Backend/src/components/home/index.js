import { addLog } from '../common/services/logToDbService';
import {
  getDetails,
  getAssetCount,
  getAllData,
  getSearchedAndSerializedData,
  getList,
} from './service';

const TYPE_LIST = [
  'dealers',
  'auction_houses',
  'specific_car_sources',
  'car_type',
];
const GROUP_LIST = [
  'Cars For Sale',
  'Auction Data',
  'Specific Cars',
  'Cars Models',
];

/**
 *@description - Home controller class
 */
export class HomeController {
  /**
   * description - dealer detail controller
   * @param {Request} req - request
   * @param {Response} res - response
   * @param {NextFunction} next - next function
   * @returns {void}
   */
  static getDetails = (req, res, next) => {
    const { id, key, group } = req.query;
    getDetails(id, key, group)
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        console.trace(err);
        next(err);
      });
  };

  /**
   * description - dealer detail controller
   * @param {Request} req - request
   * @param {Response} res - response
   * @param {NextFunction} next - next function
   * @returns {void}
   */
  static getAssetCount = (req, res, next) => {
    // const { id, key, group } = req.query;
    getAssetCount(req.query)
      .then((result) => res.status(200).json({ data: result }))
      .catch((err) => {
        console.log(err);
        next(err);
      });
  };

  /**
   * description - search controller
   * @param {Request} req - request
   * @param {Response} res - response
   * @param {NextFunction} next - next function
   * @returns {void}
   */
  static search = (req, res, next) => {
    try {
      addLog(req.user, {
        path: req.path,
        query: req.query,
        original_url: req.originalUrl,
        remote_ip: req.headers['x-forwarded-for'] || req.socket.remoteAddress,
      });
      const { query } = req;
      const { group } = query;
      if (group === 'All') {
        getAllData(query)
          .then((result) =>
            res
              .status(200)
              .json({ data: { ...result, total: result.results.length } })
          )
          .catch((err) => {
            if (err.message === 'BAD_REQUEST') {
              throwApiError('BAD_REQUEST', '400');
            } else {
              // throwApiError('Server Error', 500);
              next(err);
            }
          });
      } else if (GROUP_LIST.includes(group)) {
        getSearchedAndSerializedData(query)
          .then((result) => res.status(200).json({ data: result }))
          .catch((err) => {
            if (err.massage === 'BAD_REQUEST') {
              throwApiError('BAD_REQUEST', '400');
            } else {
              // throwApiError('Server Error', 500);
              next(err);
            }
          });
      } else {
        throwApiError('BAD_REQUEST', '400');
      }
    } catch (error) {
      if (error.message === 'BAD_REQUEST') {
        throwApiError('BAD_REQUEST', '400');
      } else {
        //
        next(error);
      }
    }
  };

  /**
   * description - search controller
   * @param {Request} req - request
   * @param {Response} res - response
   * @returns {void}
   */
  static getSortingKeys(req, res) {
    return res.json({
      data: {
        Cars: [{ display: 'Launch Year', value: 'launch_year' }],
        'Auction Data': [
          { display: 'Auction Date', value: 'auction_date' },
          { display: 'Price', value: 'price.sort_price' },
        ],
        'Cars For Sale': [{ display: 'Price', value: 'price.sort_price' }],
      },
    });
  }

  /**
   * Api for getting list of all dealers, auction House, car type, specific car sources.
   * @param {Request} req - request
   * @param {Response} res - response
   * @param {NextFunction} next - next function
   * @returns {void}
   */
  static getList(req, res, next) {
    const { type } = req.params;
    // console.log({ type });
    if (TYPE_LIST.includes(type)) {
      getList(type)
        .then((result) => res.status(200).json({ data: result }))
        .catch((err) => {
          next(err);
        });
    } else {
      throwApiError(
        `Type must be from ['dealers','auction_houses','specific_car_sources','car_type'] `,
        400
      );
    }
  }
}
