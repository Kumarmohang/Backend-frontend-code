import { numberWithCommas } from '../../util';
import { getDataWithPages, getDocumentById } from '../common/services/dbUtils';
import { fixImageUrl } from '../common/services/imageUtil';
import collector from './model';

/**
 * @description - collector search parser
 * @param {Document} document - object document
 * @returns {Document} - returns object Document
 */
function collectorSearchParser(document) {
  return {
    thumbnail: fixImageUrl(
      (document?.collector_image || document.collection_images)[0]?.thumbnail
    ),
    key1: 'Country',
    value1: document?.country || '-',
    header: document.name || '-',
    id: document._id,
  };
}

/**
 * @description - get All collectors page
 * @param {Request} req - request object
 * @returns {Document} - document object
 */
export async function getAllCollectors(req) {
  const limit = parseInt(req.query.fetchSize || 10, 10);
  const pageNo = parseInt(req.query.pageNo || 0, 10);

  const { cursor, total } = await getDataWithPages(
    collector,
    { influencer_type: 'Photographer' },
    { _id: -1 },
    pageNo * limit,
    limit
  );
  return {
    data: {
      total,
      results: cursor.map(collectorSearchParser),
    },
  };
}

/**
 *
 * @param {String} id - collector id
 * @returns {Document} - returs Document
 */
export async function getCollector(id) {
  const doc = await getDocumentById(collector, id);
  if (!doc) {
    throwApiError('Record not found', 404);
  }
  /* const { cursor, total } = await get_data_with_pages(
      "cars",
      {
        key: { $in: doc?.cars_in_collection || [] },
      },
      { year: -1 },
      skip,
      limit
    );
    const cars = await cursor.toArray();
    doc.cars = cars;
    doc.total_cars = total; */
  return doc._doc;
}

/**
 * @description -collector detail formatter function
 * @param {Document} document - document object
 * @returns {Document} - returns Document
 */
export function getCollectorDetailFormatter(document) {
  const isCollector = document.influencer_type === 'Collector';
  const images = [
    ...(document.collector_image || []),
    ...(document.collection_images || []),
  ];
  const doc = {
    id: document._id,
    name: document.name,
    image: images.length
      ? images.map((ele) => ({
          ...ele,
          original: fixImageUrl(ele.original),
          thumbnail: fixImageUrl(ele.thumbnail),
        }))
      : [
          'https://st3.depositphotos.com/23594922/31822/v/600/depositphotos_318221368-stock-illustration-missing-picture-page-for-website.jpg',
        ],
    overview: [
      {
        name: 'Source',
        value: document?.source,
        link: document.source_link,
        clickable: true,
      },
      /* {
          name: "Cars Owned",
          value: document.no_of_cars_owned,
        }, */
      {
        name: 'Country',
        value: document?.country || '-',
      },
    ],
  };

  if (document.description?.length) {
    doc.description = document.description;
  }
  if (isCollector) {
    doc.overview.push({
      name: 'Collection Cost',
      value: numberWithCommas(document.collection_cost || ''),
    });
  }
  /* if (document.cars) {
      doc.cars = document.cars.map((car) => carsSearchParser(car));
    } */
  return doc;
}
