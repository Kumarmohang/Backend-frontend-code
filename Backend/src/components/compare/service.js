/**
 *
 * @param {Model} model - collection name
 * @param {Object} filter - filter Object
 * @param {Object} sort - sort Object
 * @returns {Document}  - returns document
 */
export async function getData(model, filter = {}, sort = null) {
  // console.log(model);
  const result = (await !sort)
    ? model.find(filter)
    : model.find(filter).sort(sort);
  return result;
}
