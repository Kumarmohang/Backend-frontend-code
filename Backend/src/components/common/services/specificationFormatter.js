import { SPEC_LIST } from '../../../constants/specs';
import { isEmpty } from '../../../util';

/**
 *
 * @param {Array<any>} values - Array of values
 * @returns {Array<any>} - formatted values array
 */
const getFormattedValues = (values) => {
  const valuesEntries = Object.entries(values);
  const extractedValues = {};
  valuesEntries.forEach(([key, value]) => {
    if (value) {
      const { is_single: isSingle, value: specValue, unit } = value;
      if (isSingle) {
        extractedValues[key] = `${specValue}${unit ? ` ${unit}` : ''}`;
      } else {
        const filteredObj = Object.values(value).filter((e) => !!e);
        if (filteredObj.length > 1) {
          extractedValues[key] = filteredObj.reduce(
            (acc, cur) =>
              `${acc.value + (acc.unit || '')} | ${cur.value}${cur.unit || ''}`
          );
        } else if (filteredObj.length > 0) {
          extractedValues[key] =
            filteredObj[0].value + (filteredObj[0].unit || '');
        }
      }
    }
  });
  return extractedValues;
};

/**
 * This function formats the specification data.
 * @param {Object} specifications - Car specifications.
 * @returns {Object} formatted specification
 */
export const formatSpecification = (specifications) => {
  const specsEntries = Object.entries(specifications || {}).filter(
    ([, value]) => !isEmpty(value)
  );

  return specsEntries.map(([key, values]) => ({
    title: key,
    value: getFormattedValues(values),
  }));
};

/**
 * This function merge(create union of)  2 specifications.
 * @param {SPEC_LIST} specs1 - Specification 1
 * @param {SPEC_LIST} specs2 - Specification 2
 * @returns {SPEC_LIST} mergedSpecs
 */
export const mergeSpecs = (specs1, specs2 = SPEC_LIST) => {
  const mergedSpecs = {};
  const allKeysInSpecs2 = Object.entries(specs2);
  for (let i = 0, len = allKeysInSpecs2.length; i < len; i++) {
    const [property, values] = allKeysInSpecs2[i];
    mergedSpecs[property] = {
      ...values,
      ...specs1[property],
    };
  }
  return mergedSpecs;
};
