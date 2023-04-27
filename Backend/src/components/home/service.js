// import { ObjectId } from 'bson';
import {
  ASSET_CLASS_MODEL_MAPPING,
  COLLECTION_MODEL_MAP,
} from '../common/models/modelMapping';
import { ASSET_CLASS_MAPPING } from '../common/constants/allConstants';

import { getDetailsParser, getSearchParser } from './serializer';
import {
  // getDocumentById,
  getDistinctAndCount,
  findAllDocuments,
  findDistinctValues,
  findDocument,
  findAllDocumentCount,
  getDistinctAndCountSearch,
  getDistinct,
  getDataWithPages,
} from '../common/services/dbUtils';
// import { getThumbnailUrl } from '../common/services/imageUtil';
import { escapeRegExp } from '../../util';
import { ApiError } from '../../util/error';

const PRIORITY = {
  '2000 and above': 10,
  '40s-50s': 3,
  '50s-60s': 4,
  '60s-70s': 5,
  '70s-80s': 7,
  '80s-90s': 8,
  '90s-00s': 9,
  'Pre war': 2,
  Unknown: 1,
};

const SUPPORTED_OPERATOR = ['gt', 'lt', 'eq', 'ne', 'gte', 'lte'];
/**
 * This function separate value and mongo operator and retrun mongo query.
 * @param {String} valueWithOperator - operator and value separated by ::.
 * @returns {{operator: string, value: string}} operator and value
 */
const separateValueAndOperator = (valueWithOperator) => {
  const splitOperatorAndValue = valueWithOperator.split('::');
  if (splitOperatorAndValue.length === 2) {
    const [operator, value] = splitOperatorAndValue;
    if (SUPPORTED_OPERATOR.includes(operator)) {
      return {
        operator: `$${operator}`,
        value,
      };
    }
  } else if (splitOperatorAndValue.length === 1) {
    return {
      operator: `$eq`,
      value: splitOperatorAndValue[0],
    };
  } else {
    throw new ApiError(
      `Operator must be one of ${SUPPORTED_OPERATOR.join(', ')}`,
      400
    );
  }
};

/**
 * @description this function get year string as a perameter and return mongo query.
 * @param {string} year -Year string (2004, 2004-2022, gte::2004, lte::2022).
 * @returns {Object} - year query
 */
const getYearQuery = (year) => {
  if (year.match(/^[1-9]\d\d\d-[1-9]\d\d\d$/)) {
    const [year1, year2] = year.split('-');
    return {
      launch_year: {
        $gte: Number.parseInt(year1, 10),
        $lte: Number.parseInt(year2, 10),
      },
    };
  }
  const { operator, value } = separateValueAndOperator(year);
  return {
    launch_year: {
      [operator]: Number.parseInt(value, 10),
    },
  };
};

/**
 * Get drivers for a car
 * @param {String} key - field name
 * @returns {Array<Object>} - array of drivers
 */
const getDrivers = async (key) => {
  try {
    const eventDrivers = await findDistinctValues(
      COLLECTION_MODEL_MAP.eventTeamDrivers,
      'driver_key',
      { key }
    );
    const driverDetails = await findAllDocuments(
      COLLECTION_MODEL_MAP.drivers,
      { driver_key: { $in: eventDrivers } },
      {
        name: 1,
        driver_link: 1,
        nationality: 1,
        images: 1,
        flag_link: 1,
        _id: 1,
      }
    );
    return driverDetails;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Get other assets for car model
 *
 * @param {String} key - match key
 * @param {String} id - match id
 * @returns {Object} output - output object
 */
const getOtherAssetsForCar = async (key, id) => {
  try {
    const output = {
      auction: [],
      news: [],
      social_media: {},
      drivers: [],
      events: [],
      dealerCars: [],
      price_data: [],
      k500GraphData: [],
      similarCars: [],
    };
    // 1. Auction Cars
    const keyEscaped = escapeRegExp(key || '');
    const auction = await getDistinctAndCount(
      COLLECTION_MODEL_MAP.auctions,
      null,
      keyEscaped,
      'tag_string'
    );
    // auction = auction /* .toArray() */;
    output.auction = auction?.[0]?.count || 0;

    // 2. dealer cars/ car for sale
    const dealerCars = await getDistinctAndCount(
      COLLECTION_MODEL_MAP.carsForSale,
      null,
      keyEscaped,
      'tag_string'
    );
    // dealerCars = dealerCars.toArray();
    output.dealerCars = dealerCars?.[0]?.count || 0;

    // 3. Drivers Data
    output.drivers = await getDrivers(key);

    // 4. Specific Car
    const specificCar = await getDistinctAndCount(
      COLLECTION_MODEL_MAP.specificCars,
      null,
      keyEscaped,
      'tag_string'
    );
    output.specificCars = specificCar?.[0]?.count || 0;
    // 5. Events
    output.events = [];
    // 6. k500 Graph Data - Price Data
    /* const k500GraphData = await findDocument(COLLECTION_MODEL_MAP.k500Graph, {
      key,
    });
    if (k500GraphData) {
      output.k500GraphData = k500GraphData;
      // output.price_data = k500GraphData?.conceptzcar_price || [];
    } */
    // 7. Similar Cars
    const similarCars = await findDocument(COLLECTION_MODEL_MAP.similarCars, {
      final_merge_uuid: id,
    });
    if (similarCars) {
      const allIds = similarCars.match_cars_final_merge_uuid;
      const le = await allIds.map(async (element) => {
        const data = await findDocument(COLLECTION_MODEL_MAP.cars, {
          final_merge_uuid: element,
        });
        // console.log(
        //   'element : ',
        //   element.toString(),
        //   'images :',
        //   data?.images[0]?.original_url,
        //   data?.title,
        //   'images'
        // );
        // const json = data?.images?.[0].toJSON();
        // console.log(json, 'imageJson');
        return {
          title: data?.title || '-',
          // eslint-disable-next-line no-nested-ternary
          thumbnail: data?.images?.[0]?.original_url
            ? [data?.images?.[0]?.original_url]
            : data?.images?.[0]?.toJSON()?.originalUrl
            ? [data?.images?.[0]?.toJSON()?.originalUrl]
            : '-',
          brand_name: data?.brand_name || '-',
          id: data?._id || '-',
        };
      });
      const dataResult = await Promise.all(le).then((ele) => ele);
      output.similarCars = dataResult;
    }
    // console.log(output.similarCars, 'After promise Handling');
    // ?.[0]?.count || 0;
    return output;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Get other assets for car_year_wise model
 *
 * @param {String} key - match key
 * @returns {Object} output - output object
 */
const getOtherAssetsForCarYear = async (key) => {
  try {
    const output = {
      auction: [],
      news: [],
      social_media: {},
      drivers: [],
      events: [],
      dealerCars: [],
      price_data: [],
      k500GraphData: [],
    };
    // 1. Auction Cars
    const auction = await getDistinctAndCount(
      COLLECTION_MODEL_MAP.auctions,
      null,
      key,
      'tag_string'
    );
    // auction = auction /* .toArray() */;
    output.auction = auction?.[0]?.count || 0;

    // 2. dealer cars/ car for sale
    const dealerCars = await getDistinctAndCount(
      COLLECTION_MODEL_MAP.carsForSale,
      null,
      key,
      'tag_string'
    );
    // dealerCars = dealerCars.toArray();
    output.dealerCars = dealerCars?.[0]?.count || 0;

    // 3. Drivers Data
    output.drivers = await getDrivers(key);

    // 4. Specific Car
    const specificCar = await getDistinctAndCount(
      COLLECTION_MODEL_MAP.specificCars,
      null,
      key,
      'tag_string'
    );
    output.specificCars = specificCar?.[0]?.count || 0;
    // 5. Events
    output.events = [];

    return output;
  } catch (error) {
    throw error;
  }
};

/**
 * @description - Get OR query for specific car and auction link
 * @param {Object} specs - identification Object
 * @returns {Object} - OR query
 */
const getOrQueryForCarInstanceLink = (specs) => {
  const number =
    specs?.chassis_no ||
    specs?.identification_no ||
    specs?.serial_no ||
    specs?.vin;
  if (number) {
    return { 'identification.identity_numbers': number };
  }
  return null;
};

/**
 * @description Get other assets for matching auctions
 *
 * @param {String} key - match key
 * @param {Object} specs - identification object
 * @returns {Object} output - output object
 */
const getOtherAssetsForAuction = async (key, specs) => {
  const out = {};
  const filter = { key };
  try {
    out.car = await findDocument(COLLECTION_MODEL_MAP.cars, filter);
    const idQuery = getOrQueryForCarInstanceLink(specs);
    if (idQuery) {
      filter.$or = idQuery;
      out.barchetta = await findDocument(COLLECTION_MODEL_MAP.specificCars, {
        $and: [{ key }, idQuery],
      });
    }
    return out;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Get other assets for matching specific car
 *
 * @param {String} key - match key
 * @param {Object} specs - identification object
 * @returns {Object} output - output object
 */
const getOtherAssetsForSpecificCar = async (key, specs) => {
  // console.log({ specs });
  const out = {};
  const filter = { key };
  try {
    out.car = await findDocument(COLLECTION_MODEL_MAP.cars, filter);
    const idQuery = getOrQueryForCarInstanceLink(specs);

    if (idQuery) {
      /* console.log(
        JSON.stringify(
          {
            $and: [{ key }, idQuery],
          },
          null,
          2
        )
      ); */
      out.auctionCount = await findAllDocumentCount(
        COLLECTION_MODEL_MAP.auctions,
        {
          $and: [{ key }, idQuery],
        }
      );
    }
    return out;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Get other assets for matching car for sale
 *
 * @param {String} key - match key
 * @param {Object} output - output object
 * @returns {Object} output - output object
 */
const getOtherAssetsForCarsForSale = async (key) => {
  try {
    const car = await findDocument(COLLECTION_MODEL_MAP.cars, { key });
    return { car };
  } catch (error) {
    throw error;
  }
};

/**
 * @description Get other assets for matching car for sale
 *
 * @param {String} searchQuery - match key
 * @param {Object} output - output object
 * @returns {Object} output - output object
 */
const getSpecificCarSources = async (searchQuery) => {
  try {
    const result = await COLLECTION_MODEL_MAP.specificCars.aggregate([
      { $match: searchQuery },
      { $group: { _id: '$all_sources.source_name', myCount: { $sum: 1 } } },
      { $unwind: '$_id' },
      { $group: { _id: '$_id', count: { $sum: '$myCount' } } },
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * @description Get other assets for matching car for sale
 *
 * @param {String} id - match key
 * @param {Object} output - output object
 * @returns {Object} output - output object
 */
const getSimilarCarsForCar = async (id) => {
  try {
    const car = await findDocument(COLLECTION_MODEL_MAP.similarCars, {
      final_merge_uuid: id,
    });
    // console.log(car);
    return { car };
  } catch (error) {
    throw error;
  }
};

/**
 * Get all data by collection(asset)
 * @param {String} modelInstance - collection name
 * @param {String} key - model instance
 * @param {Object} specs - id of the document
 * @param {Object} id - id of the document
 * @returns {Object} otherAssetObj - output object
 */
const getDataByCollection = async (modelInstance, key, specs, id) => {
  try {
    let otherAssetObj = {};
    // 1. Get all related documents as per asset class
    if (modelInstance === COLLECTION_MODEL_MAP.cars) {
      otherAssetObj = await getOtherAssetsForCar(key, id);
    }
    if (modelInstance === COLLECTION_MODEL_MAP.car_year_wise) {
      otherAssetObj = await getOtherAssetsForCarYear(key);
    }
    if (modelInstance === COLLECTION_MODEL_MAP.auctions) {
      otherAssetObj = await getOtherAssetsForAuction(key, specs);
    }
    if (modelInstance === COLLECTION_MODEL_MAP.specificCars) {
      otherAssetObj = await getOtherAssetsForSpecificCar(key, specs);
    }
    if (modelInstance === COLLECTION_MODEL_MAP.carsForSale) {
      otherAssetObj = getOtherAssetsForCarsForSale(key);
    }
    if (modelInstance === COLLECTION_MODEL_MAP.similarCars) {
      otherAssetObj = getSimilarCarsForCar(id);
    }
    return otherAssetObj;
  } catch (error) {
    throw error;
  }
};

/**
 * @description - get All collection details page
 * @param {String} id - id of the collection
 * @param {String} key - key of the collection
 * @param {String} group - group name
 * @returns {Document} - document object
 */
export const getDetails = async (id, key, group) => {
  try {
    const { model } = ASSET_CLASS_MODEL_MAPPING[group];
    const isId = !!id;
    let cursor = null;
    if (isId) {
      // cursor = await getDocumentById(model, id);
      // cursor = await model.find({ _id: ObjectId(id), is_active: true });
      cursor = await findDocument(model, { _id: id });
    } else {
      cursor = await findDocument(model, { key });
    }
    if (!cursor) {
      throw new ApiError('Record not found', 404);
    }
    console.log('cursooooooor', cursor.identification);
    const out = await getDataByCollection(
      model,
      key || cursor.key,
      cursor.identification,
      cursor.final_merge_uuid
    );
    Object.assign(cursor, out);
    const serializer = getDetailsParser(model);
    return {
      data: serializer(cursor),
    };
  } catch (error) {
    throw error;
  }
};

/**
 *
 * @param {any} query  - Search data
 * @returns {Promise<any>} - Promise
 */
export const getAssetCount = async (query) => {
  const searchString = escapeRegExp(query.search || '');
  const {
    make,
    vin,
    no_of_seats: noOfSeats = null,
    roof_top: roofTop = null,
    year = null,
    category = null,
    identifier: serialNoStatus = null,
  } = query;
  // const status: string = query.status;
  const isSold = query.status;

  const searchArray = searchString?.split(' ') || [];
  const matchAndArray = searchString
    ? searchArray.map((elem) => ({
        tag_string: { $regex: new RegExp(`.*${elem}.*`, 'i') },
      }))
    : [];
  // matchAndArray.push({ key: { $nin: [null, ''], $exists: true } });
  if (make && make !== 'all') {
    // const makeRegex = new RegExp(`${make}`, 'i');
    const makeRegex = make;
    matchAndArray.push({
      $or: [{ brand_name: makeRegex }, { make: makeRegex }],
    });
  }
  let soldStatus = null;
  if (isSold && isSold !== 'All') {
    soldStatus = { is_sold: isSold === 'true' };
  }
  if (vin) {
    matchAndArray.push({
      'identification.identity_numbers': vin,
    });
  }
  const dbQuery = matchAndArray.length > 0 ? { $and: matchAndArray } : {};
  if (year) {
    matchAndArray.push(getYearQuery(year));
  }

  if (noOfSeats && noOfSeats !== 'all') {
    const { operator, value } = separateValueAndOperator(noOfSeats);

    matchAndArray.push({
      no_of_seats: { [operator]: parseInt(value, 10) },
    });
  }
  if (roofTop && roofTop !== 'all') {
    matchAndArray.push({
      roof_top: roofTop,
    });
  }
  if (category && category !== 'all') {
    matchAndArray.push({
      category,
    });
  }
  const carsDbQuery =
    matchAndArray.length > 0
      ? { $and: [...matchAndArray, { is_active: true }] }
      : { is_active: true };

  const cars = await getDistinctAndCountSearch(
    COLLECTION_MODEL_MAP.cars,
    'decade',
    carsDbQuery,
    { _id: 1 }
  );
  const auctionAndDealerCarQuery = { ...dbQuery };

  if (soldStatus) {
    if (!auctionAndDealerCarQuery.$and) {
      auctionAndDealerCarQuery.$and = [];
    }
    auctionAndDealerCarQuery.$and.push(soldStatus);
  }

  if (serialNoStatus && serialNoStatus !== 'all') {
    if (!auctionAndDealerCarQuery.$and) {
      auctionAndDealerCarQuery.$and = [];
    }
    auctionAndDealerCarQuery.$and.push({
      'identification.identity_numbers.0': {
        $exists: serialNoStatus === 'true',
      },
    });
  }
  const auction = await getDistinctAndCountSearch(
    COLLECTION_MODEL_MAP.auctions,
    null,
    auctionAndDealerCarQuery
  );
  const auctionSource = await getDistinctAndCountSearch(
    COLLECTION_MODEL_MAP.auctions,
    'auction_house',
    auctionAndDealerCarQuery
  );
  const allCars = await getDistinctAndCountSearch(
    COLLECTION_MODEL_MAP.cars,
    null,
    carsDbQuery
  );

  // const allCarYear = await getDistinctAndCountSearch(
  //   COLLECTION_MODEL_MAP.car_year_wise,
  //   null,
  //   carsDbQuery
  // );

  const allDealerCars = await getDistinctAndCountSearch(
    COLLECTION_MODEL_MAP.carsForSale,
    null,
    auctionAndDealerCarQuery
  );
  const forSaleCars = await getDistinctAndCountSearch(
    COLLECTION_MODEL_MAP.carsForSale,
    'source_name',
    auctionAndDealerCarQuery
  );

  const specificCar = await getDistinctAndCountSearch(
    COLLECTION_MODEL_MAP.specificCars,
    null,
    dbQuery
  );

  const specificCarSource = await getSpecificCarSources(dbQuery);
  /* await getDistinctAndCountSearch(
    COLLECTION_MODEL_MAP.specificCars,
    'all_sources.0.source_name',
    dbQuery
  ); */
  // const news = await getNews(searchString);
  const assetArray = [
    {
      name: 'All',
    },
    {
      name: 'Cars Models',
      subCat: [
        { name: 'All', count: allCars?.[0]?.count || 0 },
        ...cars
          .map((ele) => ({ name: ele._id, count: ele.count }))
          .sort((a, b) => PRIORITY[b.name] - PRIORITY[a.name]),
      ],
    },
    // {
    //   name: 'Cars Year Models',
    //   subCat: [
    //     { name: 'All', count: allCarYear?.[0]?.count || 0 },
    //     ...cars
    //       .map((ele) => ({ name: ele._id, count: ele.count }))
    //       .sort((a, b) => PRIORITY[b.name] - PRIORITY[a.name]),
    //   ],
    // },
    {
      name: 'Auction Data',
      subCat: [
        { name: 'All', count: auction?.[0]?.count || 0 },
        ...auctionSource.map((ele) => ({
          name: ele._id,
          count: ele.count,
        })),
      ],
    },

    /* {
      name: 'News',
      subCat: [{ name: 'All', count: news.length }],
    }, */
    {
      name: 'Cars For Sale',
      subCat: [
        { name: 'All', count: allDealerCars?.[0]?.count || 0 },
        ...forSaleCars.map((ele) => ({
          name: ele._id,
          count: ele.count,
        })),
      ],
    },
    {
      name: 'Specific Cars',
      subCat: [
        { name: 'All', count: specificCar?.[0]?.count || 0 },
        ...specificCarSource.map((ele) => ({
          name: ele._id,
          count: ele.count,
        })),
      ],
    },
    /* {
      name: 'Race Events',
      subCat: [{ name: 'Races', count: 0 }],
    },
    {
      name: 'Drivers',
      subCat: [{ name: 'Drivers', count: 0 }],
    }, */
  ];

  const carsBrand = await getDistinct(COLLECTION_MODEL_MAP.cars, 'brand_name');
  const categories = await getDistinct(COLLECTION_MODEL_MAP.cars, 'category');
  const roofTops = await getDistinct(COLLECTION_MODEL_MAP.cars, 'roof_top');
  const filters = [
    {
      type: 'Make',
      values: [
        { display: 'All', value: 'all' },
        ...carsBrand.map((ele) => ({
          display: ele,
          value: ele,
        })),
      ],
      filterFor: [
        'Cars Models',
        'Specific Cars',
        'Auction Data',
        'Cars For Sale',
        'All',
      ],
    },
    {
      type: 'Status',
      values: [
        {
          display: 'All',
          value: '',
        },
        {
          display: 'Sold',
          value: 'true',
        },
        {
          display: 'Available',
          value: 'false',
        },
      ],
      filterFor: ['Auction Data', 'Cars For Sale'],
    },
    {
      type: 'Category',
      values: [
        { display: 'All', value: 'all' },
        ...categories.map((ele) => ({
          display: ele,
          value: ele,
        })),
      ],
      filterFor: ['Cars Models'],
    },
    {
      type: 'Roof Top',
      values: [
        { display: 'All', value: 'all' },
        ...roofTops.map((ele) => ({
          display: ele,
          value: ele,
        })),
      ],
      filterFor: ['Cars Models'],
    },
    {
      type: 'Identifier',
      values: [
        { display: 'All', value: 'all' },
        {
          display: 'Not Exists',
          value: 'false',
        },
        {
          display: 'Exists',
          value: 'true',
        },
      ],
      filterFor: ['Specific Cars', 'Auction Data', 'Cars For Sale'],
    },
  ];
  return { assetClass: assetArray, filters };
};

/**
 * @description Get formated data for asset class search
 * @param {Model} modelInstance - Model instance
 * @param {Object} dbQuery - Query
 * @param {String} sortKey - Sort key
 * @param {String} type - Type string
 * @param {Number} grp - grp number
 * @returns {Object} result - Result Object
 */
const getFormatedSearchDataForAsset = async (
  modelInstance,
  dbQuery,
  sortKey,
  type,
  grp
) => {
  const parser = getSearchParser(modelInstance);
  const { total, cursor } = await getDataWithPages(
    modelInstance,
    dbQuery,
    sortKey,
    0,
    20
  );
  return {
    value: cursor.map(parser),
    total,
    type,
    grp,
  };
};

/**
 * @description - Get all search results.
 * @param {Object} reqQuery - Request query.
 * @returns {Promise<Document>} - Promise
 */
export const getAllData = async (reqQuery) => {
  try {
    const { make, search = [], vin } = reqQuery;
    const searchArray =
      typeof search === 'string'
        ? escapeRegExp(search).split(' ')
        : escapeRegExp(search);
    const queryArray =
      search.length > 0
        ? searchArray.map((elem) => ({
            tag_string: {
              $regex: new RegExp(`.*${elem}.*`, 'img'),
            },
          }))
        : [];
    if (vin) {
      queryArray.push({
        'identification.identity_numbers': vin,
      });
    }
    // queryArray.push({ key: { $nin: [null, ''], $exists: true } });
    const dbQuery = queryArray.length > 0 ? { $and: [...queryArray] } : {};
    let carDbQuery =
      queryArray.length > 0
        ? { $and: [...queryArray, { is_active: true }] }
        : { is_active: true };

    /* if (make) {
      queryArray.push({ make });
    } */
    if (make && make !== 'all') {
      // const makeRegex = new RegExp(`${make}`, "i");
      if (dbQuery.$and) {
        dbQuery.$and.push({ brand_name: make });
      }

      if (carDbQuery.$and) {
        carDbQuery.$and.push({ brand_name: make });
      }
      carDbQuery = { $and: [carDbQuery, { brand_name: make }] };
      dbQuery.$and = [{ brand_name: make }];
    }

    const allQueryResults = await Promise.all([
      getFormatedSearchDataForAsset(
        COLLECTION_MODEL_MAP.cars,
        carDbQuery,
        { launch_year: -1 },
        'Cars Models',
        1
      ),
      getFormatedSearchDataForAsset(
        COLLECTION_MODEL_MAP.auctions,
        dbQuery,
        { auction_date: -1 },
        'Auction Data',
        2
      ),
      getFormatedSearchDataForAsset(
        COLLECTION_MODEL_MAP.carsForSale,
        dbQuery,
        { 'price.sort_price': -1 },
        'Cars From Dealers',
        3
      ),
      getFormatedSearchDataForAsset(
        COLLECTION_MODEL_MAP.specificCars,
        dbQuery,
        { images_count: -1 },
        'Specific Cars',
        4
      ),
    ]);
    return {
      results: allQueryResults.filter((ele) => !!ele.total),
    };
  } catch (err) {
    console.log(err);
    throw err;
  }
};

/**
 * @description Get data for parameterized search.
 * @param {Object} reqQuery - query parameters.
 * @returns {Object} - data.
 */
export const getSearchedAndSerializedData = async (reqQuery) => {
  try {
    const {
      group,
      search = [],
      make,
      fetchSize = '24',
      // eslint-disable-next-line camelcase
      sort_key = '',
      // eslint-disable-next-line camelcase
      sort_order = '-1',
      subCat,
      year = null,
      searchBy = null,
      // eslint-disable-next-line camelcase
      auction_house = null,
      status = null,
      dealer = null,
      vin = '',
      no_of_seats: noOfSeats = null,
      roof_top: roofTop = null,
      category = null,
      identifier: serialNoStatus = null,
    } = reqQuery;
    /* if (withIdNo && withIdNo !== 'all') {
      auctionAndDealerCarQuery.$and.push({
        'identification.identity_numbers.0': { $exists: withIdNo === 'true' },
      });
    } */
    let { pageNo = '0' } = reqQuery;
    const limit = parseInt(fetchSize, 10);
    pageNo = parseInt(pageNo, 10);
    const { collection } = ASSET_CLASS_MAPPING[group];
    const modelInstance = ASSET_CLASS_MODEL_MAPPING[group].model;

    // eslint-disable-next-line camelcase
    let sortKey = sort_key;
    const sortOrder = parseInt(sort_order, 10);
    const searchArray =
      typeof search === 'string'
        ? escapeRegExp(search).split(' ')
        : escapeRegExp(search);

    let dbQuery = null;
    let sortBy = { _id: -1 };
    const searchParser = getSearchParser(modelInstance);
    const queryArray =
      search.length > 0
        ? searchArray.map((elem) => ({
            tag_string: {
              $regex: new RegExp(`.*${elem}.*`, 'img'),
            },
          }))
        : [];
    // queryArray.push({ key: { $nin: [null, ''], $exists: true } });
    if (vin) {
      queryArray.push({
        'identification.identity_numbers': vin,
      });
    }
    if (collection === 'cars') {
      if (subCat && subCat !== 'All') {
        queryArray.push({
          decade: subCat || '',
        });
      }
      if (make && make !== 'all') {
        queryArray.push({ brand_name: make });
      }
      if (year) {
        queryArray.push(getYearQuery(year));
      }

      if (noOfSeats && noOfSeats !== 'all') {
        const { operator, value } = separateValueAndOperator(noOfSeats);

        queryArray.push({
          no_of_seats: { [operator]: parseInt(value, 10) },
        });
      }
      if (roofTop && roofTop !== 'all') {
        queryArray.push({
          roof_top: roofTop,
        });
      }
      if (category && category !== 'all') {
        queryArray.push({
          category,
        });
      }
      dbQuery =
        queryArray.length > 0
          ? { $and: [...queryArray, { is_active: true }] }
          : { is_active: true };
      sortBy = { [sortKey || 'launch_year']: sortOrder };
    } else if (collection === 'auction') {
      sortBy = { [sortKey || 'auction_date']: sortOrder };
      if (!searchBy) {
        if (subCat && subCat !== 'All') {
          queryArray.push({
            // source_name: subCat,
            auction_house: subCat,
          });
        }
        // eslint-disable-next-line camelcase
        const auctionHouse = auction_house;
        const isSold = status;
        if (make && make !== 'all') {
          // const makeRegex = new RegExp(`${make}`, 'i');
          queryArray.push({ brand_name: make });
        }
        if (auctionHouse) {
          // queryArray.push({ source_name: auctionHouse });
          queryArray.push({ auction_house: auctionHouse });
        }
        if (isSold && isSold !== 'All') {
          queryArray.push({ is_sold: isSold === 'true' });
        }
        if (serialNoStatus && serialNoStatus !== 'all') {
          queryArray.push({
            'identification.identity_numbers.0': {
              $exists: serialNoStatus === 'true',
            },
          });
        }
        // withIdNo;
        dbQuery = queryArray.length > 0 ? { $and: queryArray } : {};
      } else if (searchBy === 'chassis') {
        const serialNumber = search;
        dbQuery = {
          $or: [
            { 'identification.chassis_no': serialNumber },
            { 'identification.vin': serialNumber },
            { 'identification.identification_no': serialNumber },
            { 'identification.serial_no': serialNumber },
            { 'identification.registration_no': serialNumber },
          ],
        };
      }
    } else if (collection === 'barchetta') {
      // const searchData = (req.query as any).search;
      if (subCat && subCat !== 'All') {
        queryArray.push({
          'all_sources.source_name': subCat,
        });
      }
      if (make && make !== 'all') {
        queryArray.push({ brand_name: make });
      }
      if (serialNoStatus && serialNoStatus !== 'all') {
        queryArray.push({
          'identification.identity_numbers.0': {
            $exists: serialNoStatus === 'true',
          },
        });
      }
      dbQuery = queryArray.length > 0 ? { $and: queryArray } : {};
      sortBy = { images_count: -1 };
    } else if (collection === 'dealer_cars') {
      // const isSold = reqQuery.isSold;

      if (subCat && subCat !== 'All') {
        queryArray.push({
          source_name: subCat,
        });
      }
      /*  if (isSold && isSold !== "All") {
        queryArray.push({ is_sold: isSold === "true" });
      } else  */ if (status && status !== 'All') {
        queryArray.push({ is_sold: status === 'true' });
      }
      if (dealer) {
        queryArray.push({ source_name: dealer });
      }
      if (make && make !== 'all') {
        queryArray.push({ brand_name: make });
      }
      if (serialNoStatus && serialNoStatus !== 'all') {
        queryArray.push({
          'identification.identity_numbers.0': {
            $exists: serialNoStatus === 'true',
          },
        });
      }
      // console.log('SSSSSSorrrrtttttttKKKKk', sortKey);

      // sortKey = 'created_at';
      // sortBy = { [sortKey || 'price.sort_price']: sortOrder || -1 };

      sortKey = 'price.sort_price';
      sortBy = { [sortKey || 'created_at']: sortOrder || -1 };
      // console.log('SSSSSSorrrrtttttttKKKKk=====', sortBy);

      dbQuery = queryArray.length > 0 ? { $and: queryArray } : {};
    }
    let res = null;
    console.log({ dbQuery, sortBy });

    if (dbQuery) {
      const { total, cursor } = await getDataWithPages(
        modelInstance,
        dbQuery,
        sortBy,
        pageNo * limit,
        limit
      );
      // const resultArray = await cursor.toArray();
      res = {
        total,
        results: cursor.map((doc) =>
          collection === 'barchetta'
            ? searchParser(doc, subCat)
            : searchParser(doc)
        ),
      };
    } else {
      throw new ApiError('Bad Request', 400);
    }
    return res;
  } catch (err) {
    throw err;
  }
};

/**
 * @description Get List for type.
 * @param {string} type - Type of asset.
 * @returns {String[]} - Array of distinct asset types.
 */
export const getList = async (type) => {
  try {
    let model = null;
    let keyName = '';
    if (type === 'dealers') {
      model = COLLECTION_MODEL_MAP.carsForSale;
      keyName = 'source_name';
    } else if (type === 'auction_houses') {
      model = COLLECTION_MODEL_MAP.auctions;
      keyName = 'auction_house';
    } else if (type === 'specific_car_sources') {
      model = COLLECTION_MODEL_MAP.specificCars;
      keyName = 'all_sources.source_name';
    } else if (type === 'car_type') {
      model = COLLECTION_MODEL_MAP.cars;
      keyName = 'car_type';
    }
    const results = await getDistinct(model, keyName);
    return results;
  } catch (error) {
    throw error;
  }
};
