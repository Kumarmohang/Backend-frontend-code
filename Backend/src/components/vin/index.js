import { getCarDetailsByVin } from './service';
/**
 * @description - Vehicle Identification Number (VIN) component
 */
export class VinController {
  /**
   * @description - Function for getting specific vin details
   * @param {Request} req - request object
   * @param {Response} res - response object
   * @param {NextFunction} next - next function
   * @returns {void} - returns void
   */
  static getVinDetails(req, res, next) {
    const { vin } = req.query;
    if (vin) {
      getCarDetailsByVin(vin.toUpperCase())
        .then((result) => {
          res.json({ data: result });
        })
        .catch((err) => {
          next(err);
        });
    } else {
      throwApiError('vin number is required', 400);
    }
  }
}
