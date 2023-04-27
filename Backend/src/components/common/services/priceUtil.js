/* eslint-disable no-nested-ternary */
import { numberWithCommas } from '../../../util';

/** 
 * @typedef {{
    sale_price_str: string,
    estimate_currency: string|number,
    estimate_max: string|number,
    estimate_max_usd: string|number,
    estimate_min: string|number,
    estimate_min_usd: string|number,
    sale_price: string|number,
    sale_price_currency: string,
    sale_price_usd: string|number
  }} Price
  *  
  */

/**
 * @description getEstimatedPriceStr - Format estimated price field
 * @param {Object} price - price object
 * @returns {String|Object} - formatted price string or null object
 */
export const getEstimatedPriceStr = (price) => {
  if (
    price?.estimate_price_str &&
    price?.estimate_price_str.length > 0
    // price?.estimate_max &&
    // price?.estimate_max
  )
    return price?.estimate_max
      ? price?.estimate_min
        ? `${numberWithCommas(price?.estimate_min)} - ${numberWithCommas(
            price?.estimate_max
          )} ${price?.estimate_currency}`
        : `${numberWithCommas(price?.estimate_max)} ${price?.estimate_currency}`
      : `${numberWithCommas(price?.estimate_min)} ${price?.estimate_currency}`;
  return null;
};

/**
 *
 * @param {Price} priceObj - Price object
 * @returns {string} - Formatted price
 */
export const getFormattedPrice = (priceObj) =>
  priceObj?.sale_price
    ? `${priceObj?.sale_price_currency} ${numberWithCommas(
        priceObj?.sale_price
      )}`
    : priceObj?.sale_price_str || getEstimatedPriceStr(priceObj) || '-';
