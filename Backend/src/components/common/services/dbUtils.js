/**
 * @description - common get result function
 * @param {Model} modelInstance - mongoose model

 * @param {any} filter - filter
 * @param {Number} skip - skip size
 * @param {Number} limit - limit
 * @returns {Document} - return A Document object
 */
export async function getDataCount(modelInstance, filter = {}) {
  try {
    const data = await modelInstance.aggregate(
      [
        {
          $addFields: {
            // flag to indicate Entity.Groups is null/missing/empty array
            groupsMissing: {
              $eq: [
                {},
                {
                  $ifNull: ['$year_wise_specifications', {}],
                },
              ],
            },
            // make Entity.Groups an empty array to avoid $anyElementTrue error
            year_wise_specifications: {
              $ifNull: ['$year_wise_specifications', {}],
            },
          },
        },
        { $match: filter },
        {
          $facet: {
            metadata: [{ $count: 'total' }],
            // data: [{ $skip: skip }, { $limit: limit }],
          },
        },
      ],
      {
        allowDiskUse: true,
      }
    );
    // const count = await modelInstance.count(filter);
    const [result] = data;
    const total = result.metadata[0]?.total || 0;
    // console.log({ data });
    return { total };
  } catch (e) {
    throw e;
  }
}

/**
 * @description - common get result function
 * @param {Model} modelInstance - mongoose model

 * @param {any} filter - filter
 * @param {any} sort - sort object
 * @param {Number} skip - skip size
 * @param {Number} limit - limit
 * @returns {Document} - return A Document object
 */
export async function getDataWithPages(
  modelInstance,
  filter = {},
  sort = null,
  skip = 0,
  limit = 200
) {
  try {
    const data = await modelInstance.aggregate(
      [
        { $match: filter },
        { $sort: sort },
        {
          $facet: {
            metadata: [{ $count: 'total' }],
            data: [{ $skip: skip }, { $limit: limit }], // add projection here
          },
        },
      ],
      {
        allowDiskUse: true,
      }
    );
    // const count = await modelInstance.count(filter);
    const [result] = data;
    const total = result.metadata[0]?.total || 0;
    // console.log({ data });
    return {
      cursor: result.data,
      total,
    };
  } catch (e) {
    throw e;
  }
}

/**
 * @description - common get result function
 * @param {Model} modelInstance - mongoose model

 * @param {any} filter - filter
 * @param {any} sort - sort object
 * @param {Number} skip - skip size
 * @param {Number} limit - limit
 * @returns {Document} - return A Document object
 */
export async function getDataForAdvanceSearch(
  modelInstance,
  filter = {},
  sort = null,
  skip = 0,
  limit = 200
) {
  try {
    const data = await modelInstance.aggregate(
      [
        {
          $addFields: {
            // flag to indicate Entity.Groups is null/missing/empty array
            groupsMissing: {
              $eq: [
                {},
                {
                  $ifNull: ['$year_wise_specifications', {}],
                },
              ],
            },
            // make Entity.Groups an empty array to avoid $anyElementTrue error
            year_wise_specifications: {
              $ifNull: ['$year_wise_specifications', {}],
            },
          },
        },
        { $match: filter },
        { $sort: sort },
        {
          $facet: {
            metadata: [{ $count: 'total' }],
            data: [{ $skip: skip }, { $limit: limit }], // add projection here
          },
        },
      ],
      {
        allowDiskUse: true,
      }
    );
    // const count = await modelInstance.count(filter);
    const [result] = data;
    const total = result.metadata[0]?.total || 0;
    // console.log({ data });
    return {
      cursor: result.data,
      total,
    };
  } catch (e) {
    throw e;
  }
}

/**
 * description - get model by Id
 * @param {Model} modelInstance - mongoose model
 * @param {String} id - Document id.
 * @returns {Promise<Document>} - object Document
 */
export async function getDocumentById(modelInstance, id) {
  try {
    // console.log({ id });
    const results = await modelInstance.findById(id);
    // console.log(results);
    return results;
  } catch (error) {
    throw error;
  }
}

/**
 * description - find data
 * @param {Model} modelInstance - mongoose model
 * @param {Object} query - Query Object.
 * @param {Object} projection - Projection Object.
 * @returns {Array<Document>} - object Document
 */
export const findAllDocuments = async (
  modelInstance,
  query,
  projection = null
) => {
  try {
    const results = await modelInstance.find(query, projection);
    return results;
  } catch (error) {
    throw error;
  }
};

/**
 * description - find all unique document count
 * @param {Model} modelInstance - mongoose model
 * @param {Object} query - Query Object.
 * @returns {Number} -  Document Count
 */
export const findAllDocumentCount = async (modelInstance, query) => {
  try {
    const results = await modelInstance.count(query);
    return results;
  } catch (error) {
    throw error;
  }
};

/**
 * description - find one document
 * @param {Model} modelInstance - mongoose model
 * @param {Object} query - Query Object.
 * @param {Object} projection - Projection Object.
 * @returns {Document} - object Document
 */
export const findDocument = async (modelInstance, query, projection = null) => {
  try {
    const results = await modelInstance.findOne(query, projection);
    return results;
  } catch (error) {
    throw error;
  }
};

/**
 * description - find distict values from table
 * @param {Model} modelInstance - mongoose model
 * @param {String} field - field.
 * @param {Object} query - Query Object.
 * @returns {Array<String>} - distinct value array
 */
export const findDistinctValues = async (modelInstance, field, query) => {
  try {
    const results = await modelInstance.distinct(field, query);
    return results;
  } catch (error) {
    throw error;
  }
};

/**
 * @description - get distinct data and count by key
 * @param {Model} modelInstance - mongoose model
 * @param {String} field - field name
 * @param {String} search - search value
 * @param {String} searchKey -  search key
 * @returns {Document} - object Document
 */
export const getDistinctAndCount = async (
  modelInstance,
  field,
  search,
  searchKey
) => {
  try {
    const result = await modelInstance.aggregate([
      {
        $match: {
          [searchKey]: { $regex: new RegExp(`.*${search}.*`, 'i') },
        },
      },
      { $group: { _id: `$${field}`, count: { $sum: 1 } } },
      { $sort: { count: -1 } },
    ]);
    return result;
  } catch (error) {
    throw error;
  }
};

/**
 * @description - get distinct data and count by key
 * @param {Model} modelInstance - mongoose model
 * @param {String} field - field name
 * @param {any} query - search value
 * @param {any?} sorter - sorter value
 * @returns {Document} - object Document
 */
export async function getDistinctAndCountSearch(
  modelInstance,
  field,
  query,
  sorter = { count: -1 }
) {
  const result = await modelInstance.aggregate([
    {
      $match: query,
    },
    { $group: { _id: `$${field}`, count: { $sum: 1 } } },
    { $sort: { ...sorter } },
  ]);
  return result;
}

/**
 *
 * @param {Model} modelInstance - mongoose model
 * @param {string} key - key
 * @returns {Array<string>} - object Document
 */
export const getDistinct = async (modelInstance, key) => {
  try {
    // console.log(filter);
    const distinctRecord = await modelInstance.distinct(key);
    return distinctRecord;
  } catch (error) {
    throw error;
  }
};
