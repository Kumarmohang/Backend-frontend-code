import { ObjectID } from 'bson';
// import { COLLECTION } from '../constant/index';
// import { CommandCollection } from 'models/modals'
import { getData } from './service';
import { getComparisonDetails } from './serializer';
import Car from '../car/model';
/**
 * Compare Class
 */
export class Compare {
  /**
   * @description - getCarsDetails function
   * @param {Request} req - request object
   * @param {response} res - rsponse objet
   * @returns {void} - return void
   */
  getCarsDetail(req, res) {
    const { ids } = req.query;
    const query = {
      _id: { $in: ids.split(',').map((ele) => new ObjectID(ele)) },
    };
    // res.json(query);
    getData(Car, query)
      .then((cursor) => {
        // console.log(cursor);
        res.json({ data: cursor.map((doc) => getComparisonDetails(doc)) });
      })
      .catch((err) => {
        throw err;
      });
  }
}
export default new Compare();
