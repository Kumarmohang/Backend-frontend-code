const storageType = localStorage; // localStorage || sessionStorage

/**
 * @description This function set data to desired storage
 * @param {string} keyName
 * @param {Object} value
 * @returns void
 */
export const setData = (keyName, value) => {
  storageType.setItem(keyName, JSON.stringify(value));
};
/**
 * @description This function delete all data from desired storage
 * @returns {void} void
 */
export const deleteData = () => {
  storageType.clear();
};
/**
 * @description This function get data from desired storage
 * @param {string} keyName
 * @returns {Object} value
 */
export const getData = (keyName) => {
  let data = null;
  try {
    data = JSON.parse(storageType.getItem(keyName));
  } catch (error) {
    deleteData();
    // eslint-disable-next-line no-restricted-globals
    location.reload();
  }
  return data;
};
