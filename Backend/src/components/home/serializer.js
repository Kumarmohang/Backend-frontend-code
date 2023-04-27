import { getAuctionDocument, auctionSearchParser } from '../auction/serializer';
import { carsSearchParser, getCarsDocument } from '../car/serializer';
import {
  carYearSearchParser,
  getCarYearDocument,
} from '../advanceSearch/serializer';
import {
  getSellBuyCarDetails,
  carsByDealerSearchParser,
} from '../dealer/serializer';
import {
  getSpecificCarDetails,
  specificCarSearchParser,
} from '../specificCar/serializer';
import { COLLECTION_MODEL_MAP } from '../common/models/modelMapping';

/**
 * @typedef {import('mongoose').Model} Model
 */

/**
 *
 * @param {Model} modelInstance - mongoose model
 * @returns {Function} - serializer function
 */
export const getDetailsParser = (modelInstance) => {
  if (modelInstance === COLLECTION_MODEL_MAP.auctions) {
    return getAuctionDocument;
  }
  if (modelInstance === COLLECTION_MODEL_MAP.cars) {
    return getCarsDocument;
  }
  if (modelInstance === COLLECTION_MODEL_MAP.car_year_wise) {
    return getCarYearDocument;
  }
  if (modelInstance === COLLECTION_MODEL_MAP.specificCars) {
    return getSpecificCarDetails;
  }
  if (modelInstance === COLLECTION_MODEL_MAP.carsForSale) {
    return getSellBuyCarDetails;
  }
};

/**
 *
 * @param {Model} modelInstance - mongoose model
 * @returns {Function} - serializer function
 */
export const getSearchParser = (modelInstance) => {
  if (modelInstance === COLLECTION_MODEL_MAP.auctions) {
    return auctionSearchParser;
  }
  if (modelInstance === COLLECTION_MODEL_MAP.cars) {
    return carsSearchParser;
  }
  if (modelInstance === COLLECTION_MODEL_MAP.car_year_wise) {
    return carYearSearchParser;
  }
  if (modelInstance === COLLECTION_MODEL_MAP.specificCars) {
    return specificCarSearchParser;
  }
  if (modelInstance === COLLECTION_MODEL_MAP.carsForSale) {
    return carsByDealerSearchParser;
  }
};
