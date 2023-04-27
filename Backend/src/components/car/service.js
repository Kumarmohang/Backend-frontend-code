/* eslint-disable no-extra-boolean-cast */
import { ApiError } from '../../util/error';
import { COLLECTION_MODEL_MAP } from '../common/models/modelMapping';
import {
  getDataWithPages,
  findDistinctValues,
} from '../common/services/dbUtils';
import { carsListParser } from './serializer';

const SUPPORTED_OPERATOR = ['gt', 'lt', 'eq', 'ne', 'gte', 'lte'];
const RELEASE_STATUS = ['upcoming', 'released'];
const SORT_ORDER_MAPPING = { desc: -1, asc: 1 };
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
  } else if (
    splitOperatorAndValue.length === 1 &&
    splitOperatorAndValue[0].length === 4
  ) {
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
 * @description Get data for parameterized search.
 * @param {Object} query - query parameters.
 * @returns {Object} - data.
 */
export const getAllCar = async (query) => {
  const {
    pageNo,
    fetchSize,
    search,
    make,
    year,
    carType,
    sortKey,
    sortOrderStr = 'desc',
    releaseStatus,
  } = query;
  const sortOrder = SORT_ORDER_MAPPING[sortOrderStr];
  if (!sortOrder) {
    throwApiError('Sort order must be one of desc, asc', 400);
  }
  const pageNoInt = Number.parseInt(pageNo, 10);
  const fetchSizeInt = Number.parseInt(fetchSize, 10);
  const modelInstance = COLLECTION_MODEL_MAP.cars;
  const sortOrderInt = Number.parseInt(sortOrder, 10);

  let dbQuery = null;
  const searchArray = typeof search === 'string' ? search.split(' ') : [search];
  const queryArray =
    search && searchArray.length > 0
      ? searchArray.map((elem) => ({
          tag_string: {
            $regex: new RegExp(`.*${elem}.*`, 'img'),
          },
        }))
      : [];
  if (make) {
    queryArray.push({ brand_name: make });
  }
  if (year) {
    if (year.match(/^\d\d\d\d-\d\d\d\d$/)) {
      const [year1, year2] = year.split('-');
      queryArray.push({
        launch_year: {
          $gte: Number.parseInt(year1, 10),
          $lte: Number.parseInt(year2, 10),
        },
      });
    } else {
      const { operator, value } = separateValueAndOperator(year);
      queryArray.push({
        launch_year: {
          [operator]: Number.parseInt(value, 10),
        },
      });
    }
  }
  if (carType) {
    queryArray.push({
      car_type: carType,
    });
  }
  if (releaseStatus && RELEASE_STATUS.includes(releaseStatus.toLowerCase())) {
    queryArray.push({
      is_upcoming: releaseStatus.toLowerCase() === 'upcoming',
    });
  } else if (releaseStatus) {
    throw new ApiError('Unknown releaseStatus. Release', 400);
  }
  queryArray.push({ is_active: true });
  dbQuery = queryArray.length > 0 ? { $and: queryArray } : {};
  let res = null;
  const sortBy = { [sortKey || 'launch_year']: sortOrderInt, _id: -1 };

  const { total, cursor } = await getDataWithPages(
    modelInstance,
    dbQuery,
    sortBy,
    pageNoInt * fetchSizeInt,
    fetchSizeInt
  );
  const actualData = await modelInstance.find({
    // title: { $regex: search, $options: 'i' },
    title: search,
    is_active: true,
  });
  // console.log(actualData)
  // actualData.map((e) => {
  //   console.log(e.title);
  //   return e.title;
  // });
  let check = [];
  if (actualData.length > 0) {
    // for (let i = 0; i < actualData.length; i++) {
    check = cursor.filter((obj) => actualData[0].title === obj.title);

    if (check.length === 0) {
      cursor.unshift(actualData[0]);
    }
    // }
  }

  // const resultArray = await cursor.toArray();
  res = {
    total,
    results: cursor.map((doc) => carsListParser(doc)),
  };

  return res;
};

/**
 * @description Get data for distinct car series.
 * @param {Object} query - query parameters.
 * @returns {Object} - data.
 */
export const getAllSeries = async (query) => {
  const { make } = query;
  const modelInstance = COLLECTION_MODEL_MAP.cars;
  let res = null;

  const results = await findDistinctValues(modelInstance, 'series', {
    brand_name: { $in: make.split(',') },
  });
  res = {
    total: results.length,
    results,
  };

  return res;
};

/**
 * @description Get data for distinct car series.
 * @param {Object} query - query parameters.
 * @returns {Object} - data.
 */
export const getAnalyticalData = async () => {
  const modelInstance = COLLECTION_MODEL_MAP.car_analytics;
  let res = null;

  const results = await modelInstance.find({});
  res = {
    total: results.length,
    result: results[0].car_analytics,
  };

  return res;
};
