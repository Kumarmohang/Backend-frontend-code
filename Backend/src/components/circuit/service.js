import { parseInt } from 'lodash';
import Circuits from './model';
import { getDataWithPages, getDocumentById } from '../common/services/dbUtils';

/**
 * description - Serializer for All circuit result
 * @param {Document} document - Object Document
 * @returns  {Document} - Object Document
 */
function circuitSearchFormatter(document) {
  /* 
  name	website	gallery	descriptions	contact	instagram_link	instagram_follower	instagram_posts
  */
  // const split_url = document.country_icon_url.split('/');
  return {
    thumbnail:
      document.thumbnail ||
      'https://st3.depositphotos.com/23594922/31822/v/600…illustration-missing-picture-page-for-website.jpg',
    key1: 'Country',
    value1: document.country,
    header: document.title,
    // is_clickable: true,
    link: document.url,
    id: document._id,
  };
}
/**
 * description - get circuit details by id.
 * @param {Document} document - A object document.
 * @returns {Document} - formatted document.
 */
function formatCircuitDetails(document) {
  // console.log({ document: document.circuit_info });
  return {
    name: document.title,
    image: document.timeline.map((ele) => ({
      original: ele.images,
      thumbnail: ele.images,
      description: `${ele.event_name || ''} (${ele.timeline || ''}): ${
        ele.circuit_length
      }`,
    })),
    overview: document.circuit_info.map((ele) => ({
      name: ele.key,
      value: ele.value,
    })),
    description: document.description.filter((ele) => !ele.startsWith('url:')),
  };
}

/**
 * description - get all circuit page
 * @param {{search:string, pageNo:string, fetchSize:string}} req - request object
 * @returns {Document} - returns document object
 */
export async function getAllCircuits({ search, pageNo, fetchSize }) {
  // get_data('circuits')
  const query = {};
  if (search) {
    query.title = {
      $regex: `.*${search.replace(/\s/g, '\\s')}.*`,
      $options: 'igm',
    };
  }
  try {
    const limit = parseInt(fetchSize || 10, 10);
    const skip = parseInt(pageNo || 0, 10);

    const { cursor, total } = await getDataWithPages(
      Circuits,
      query,
      { images_count: -1, _id: 1 },
      skip * limit,
      limit
    );
    return {
      data: {
        results: cursor.map(circuitSearchFormatter),
        total,
      },
    };
  } catch (error) {
    throw error;
  }
}

/**
 * description - get circuit detail by id
 * @param {any} req - Request
 * @returns {Document} - document object
 */
export const getFormattedCircuitDetails = async (req) => {
  const { id } = req.query;
  try {
    const circuit = await getDocumentById(Circuits, id);
    if (!circuit) {
      throwApiError('Record not found', 404);
    }
    return {
      data: formatCircuitDetails(circuit),
    };
  } catch (error) {
    throw error;
  }
};
