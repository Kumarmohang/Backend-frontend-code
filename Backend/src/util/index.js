import moment from 'moment';

/**
 *
 * @param {moment.MomentInput} date - Date to be formatted
 * @returns {string} - Formatted date
 */
export const getDate = (date) => moment(date).utc().format('L');

/**
 *
 * @param {any} obj - Test Subject
 * @returns {boolean} - is Empty object
 */
export const isEmpty = (obj) => !Object.keys(obj || {}).length;

/**
 *
 * @param {any} testSubject - Test Subject
 * @returns {Boolean} - is String
 */
export const isString = (testSubject) => typeof testSubject === 'string';

/**
 *
 * @param {string|Date} date - Date to be formatted
 * @returns {string} - Formatted date
 */
export const getDateString = (date) => {
  if (date && isString(date)) {
    return date;
  }
  if (date) {
    return getDate(date);
  }
  return '-';
};

/**
 * @description - change number to string
 * @param {Number} x - Number
 * @returns {String} - returns string
 */
export const numberWithCommas = (x) => {
  const flag = /^\d+$/.test(x);
  // eslint-disable-next-line no-nested-ternary
  return typeof x !== 'string'
    ? x?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : flag
    ? x.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : x;
};

/**
 * This function is used to escape RegExp characters.
 * @param {string} text - Text to be formatted.
 * @returns {string} - Formatted text.
 */
export const escapeRegExp = (text = '') =>
  text ? text?.replace?.(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&') : text;
