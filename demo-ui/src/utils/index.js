import apiClient, { discardHeader, setHeader } from "./apiClient";
export * as notify from "./notifyUtil";
export * as session from "./sessionManagement";
export function indexOf(list, item) {
  return list.findIndex((x) => JSON.stringify(x) === JSON.stringify(item));
}
export const headerUtils = { discardHeader, setHeader };
export default apiClient;

/**
 * @description - change number to string
 * @param {Number} x - Number
 * @returns {String} - returns string
 */
export const numberWithCommas = (x) => {
  const splittedValue = x.toString().split(".");

  const flag = /^\d+$/.test(x[0]);
  // eslint-disable-next-line no-nested-ternary
  const dta =
    typeof x !== "string"
      ? splittedValue[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : flag
      ? splittedValue[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      : splittedValue[0];
  console.log({ dta });
  return `${dta}${splittedValue[1] ? "." + splittedValue[1] : ""}`;
};

/**
 *
 * @param {any} obj - Test Subject
 * @returns {boolean} - is Empty object
 */
export const isEmpty = (obj) => !Object.keys(obj || {}).length;
