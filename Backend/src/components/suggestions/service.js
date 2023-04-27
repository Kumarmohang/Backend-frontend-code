import { getDataWithPages } from '../common/services/dbUtils';
import Suggestions from './model';
/**
 * @description Get data for parameterized search.
 * @param {Object} query - query parameters.
 * @returns {Object} - data.
 */
export const getAllSuggestions = async (query) => {
  const { pageNo, fetchSize } = query;
  const pageNoInt = Number.parseInt(pageNo, 10);
  const fetchSizeInt = Number.parseInt(fetchSize, 10);
  const modelInstance = Suggestions;

  const dbQuery = {};

  const { total, cursor } = await getDataWithPages(
    modelInstance,
    dbQuery,
    { createdAt: -1 },
    pageNoInt * fetchSizeInt,
    fetchSizeInt
  );
  // const resultArray = await cursor.toArray();
  const res = {
    total,
    results: cursor.map((doc) => doc),
  };

  return res;
};

/**
 * @description Create new suggestion.
 * @param {{comment:string, status: string, record: any, recordType:string, recordPath:string}} body - new suggestion.
 * @param {{username: string, is_active: boolean, password:string, salt:string, _id:string}} user - user.
 * @returns {Object} - data.
 */
export const createSuggestion = async (body, user) => {
  try {
    const { comment, record, status, recordType, recordPath } = body;

    const suggestion = await Suggestions.create({
      comment,
      record,
      status,
      recordType,
      recordPath,
      createdBy: user.username,
    });
    return suggestion;
  } catch (error) {
    throwApiError(error.message, 400);
  }
};

/**
 * @description Update existing suggestion.
 * @param {{id:string, status: string }} body - Updated suggestion.
 * @returns {Object} - data.
 */
export const updateSuggestion = async (body) => {
  try {
    const { id, status } = body;

    const suggestion = await Suggestions.findByIdAndUpdate(id, {
      $set: { status },
    });
    return suggestion;
  } catch (error) {
    throwApiError('Unable to create suggestion', 500);
  }
};
