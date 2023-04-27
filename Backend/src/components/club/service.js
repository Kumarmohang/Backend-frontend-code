import Club from './model';
import { getDataWithPages, getDocumentById } from '../common/services/dbUtils';
import { getDate } from '../../util';

/**
 * description - Serializer for All club result
 * @param {Document} document - Object Document
 * @returns  {Document} - Object Document
 */
function clubsSearchFormatter(document) {
  /* 
  name	website	gallery	descriptions	contact	instagram_link	instagram_follower	instagram_posts
  */

  return {
    thumbnail: document?.logo || document?.gallery?.[0],
    key1: 'Contact',
    value1: document.contact || '-',
    /* key2: 'Contact',
    value2: document.contact, */
    header: document.name,
    // link: document.car_link,
    id: document._id,
  };
}
/**
 * description - get club details by id.
 * @param {Document} mongooseDoc - A object document.
 * @returns {Document} - formatted document.
 */
function formatClubDetails(mongooseDoc) {
  const document = mongooseDoc._doc;
  const doc = {
    overview: [
      {
        name: 'Contact',
        value: document?.contact || '-',
      },
      {
        name: 'Website',
        value: document?.name,
        link: document?.website,
        clickable: true,
      },
    ],
    section3: [
      {
        name: 'Social Media',
        value: [
          {
            name: 'Instagram followers',
            link: document?.instagram_link || null,
            value: document?.instagram_follower || '-',
            clickable: true,
          },
          /* {
            name: 'Twitter follower',
            link: document?.social_media?.twitter?.link || null,
            value: document?.social_media?.twitter?.count || '-',
            clickable: true,
          }, */
        ],
      },
    ],
    section2: {
      name: 'Description',
      value: [document.descriptions] || [],
    },
    image: (document?.gallery || [])
      .filter((ele) => !!ele)
      .map((ele) => ({
        original: ele,
        thumbnail: ele,
      })),
    id: document._id,
    name: document.name,
  };

  if (document?.event_details?.length) {
    doc.section3.push({
      name: 'Events',
      value: document.event_details.map((ele) => ({
        event_date: getDate(ele.event_date),
        event_name: ele.event_name,
        event_key: ele.event_key,
      })),
    });
  }
  return doc;
}

/**
 * description - get all club page
 * @param {Request} req - request object
 * @returns {Document} - returns document object
 */
export async function getAllClub(req) {
  const limit = parseInt(req.query.fetchSize || 10, 10);
  const pageNo = parseInt(req.query.pageNo || 0, 10);
  // get_data('clubs')
  try {
    const { cursor, total } = await getDataWithPages(
      Club,
      {},
      { _id: -1 },
      pageNo * limit,
      limit
    );
    return {
      data: {
        results: cursor.map(clubsSearchFormatter),
        total,
      },
    };
  } catch (error) {
    throw error;
  }
}

/**
 * description - get club detail by id
 * @param {any} req - Request
 * @returns {Document} - document object
 */
export const getFormattedClubDetails = async (req) => {
  const { id } = req.query;
  try {
    const club = await getDocumentById(Club, id);
    if (!club) {
      throwApiError('Record not found', 404);
    }
    return {
      data: formatClubDetails(club),
    };
  } catch (error) {
    throw error;
  }
};
