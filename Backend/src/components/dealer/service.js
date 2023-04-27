import Dealer from './model';
import { getDataWithPages } from '../common/services/dbUtils';
import { dealerPageFormatter } from './serializer';

/**
 * description - get all dealer page
 * @param {Number} limit - total record limit
 * @param {Number} pageNo - page number
 * @returns {Document} - returns document object
 */
export async function getDealers(limit, pageNo) {
  try {
    const { cursor, total } = await getDataWithPages(
      Dealer,
      {},
      { _id: -1 },
      pageNo * limit,
      limit
    );
    return {
      data: {
        results: cursor.map(dealerPageFormatter),
        total,
      },
    };
  } catch (error) {
    throw error;
  }
}
