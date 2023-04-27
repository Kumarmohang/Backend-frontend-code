import apiClient from "../../utils/apiClient";
import { apiBegin, apiSuccess, apiFailure } from "../../logic";

const API_CONFIG = {
  GET_SEARCH_RESULT: {
    method: "GET",
    url: "/search",
  },
  GET_FILTERS: {
    method: "GET",
    url: "/get-asset-class",
  },
  GET_SORT_KEYS: {
    method: "GET",
    url: "/cars/sort_key",
  },
};

const defaultState = {
  loading: false,
  isError: false,
  error: null,
  flag: false,
  data: null,
  queryparam: "",
};

const getResultStart = () => ({ type: "GET_RESULT_START" });
const getResultSuccess = (payload, query) => ({
  type: "GET_RESULT_SUCCESS",
  payload,
  query,
});
const getResultError = (error, query) => ({
  type: "GET_RESULT_ERROR",
  error,
  query,
});
export const getResultReset = () => ({ type: "GET_RESULT_RESET" });

const getResultReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_RESULT_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
        queryparam: "",
      };
    }
    case "GET_RESULT_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
        queryparam: action.query,
      };
    }
    case "GET_RESULT_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
        queryparam: action.query,
      };
    }
    case "GET_RESULT_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const defaultCompareListState = {
  data: [],
};
export const updateCompareList = (updatedList) => ({
  type: "UPDATE_COMPARE_LIST",
  data: updatedList,
});

export const resetCompareList = () => ({
  type: "RESET_COMPARE_LIST",
});

const compareListReducer = (state = defaultCompareListState, action) => {
  switch (action.type) {
    case "UPDATE_COMPARE_LIST": {
      return {
        ...state,
        data: action.data,
      };
    }
    case "RESET_COMPARE_LIST": {
      return {
        ...defaultCompareListState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const getSearchResult = (query) => (dispatch) => {
  const payload = { ...API_CONFIG.GET_SEARCH_RESULT };
  if (
    !query ||
    !query?.toString()?.includes("group=") ||
    !query?.toString()?.includes("search=")
  ) {
    return;
  }
  payload.url += `?${query}`;
  dispatch(apiBegin());
  dispatch(getResultStart());
  apiClient(payload)
    .then((res) => {
      dispatch(apiSuccess());
      dispatch(getResultSuccess(res.data.data, query));
    })
    .catch((err) => {
      dispatch(apiFailure(err));

      dispatch(getResultError(err, query));
    });
};

/* ======================== */
const getFilterStart = () => ({ type: "GET_FILTER_START" });
const getFilterSuccess = (payload) => ({ type: "GET_FILTER_SUCCESS", payload });
const getFilterError = (error) => ({ type: "GET_FILTER_ERROR", error });
export const getFilterReset = () => ({ type: "GET_FILTER_RESET" });

const getFilterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_FILTER_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_FILTER_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
      };
    }
    case "GET_FILTER_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_FILTER_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const getFilterResult = (query) => (dispatch) => {
  const payload = { ...API_CONFIG.GET_FILTERS };
  if (!query) {
    payload.url += "";
  } else {
    payload.url += `?${query}`;
  }

  dispatch(apiBegin());
  dispatch(getFilterStart());
  apiClient(payload)
    .then((res) => {
      dispatch(apiSuccess());
      dispatch(getFilterSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(apiFailure(err));
      dispatch(getFilterError(err));
    });
};
/* ======================== */
const getCarsStart = () => ({ type: "GET_CARS_START" });
const getCarsSuccess = (payload, query) => ({
  type: "GET_CARS_SUCCESS",
  payload,
  query,
});
const getCarsError = (error, query) => ({
  type: "GET_CARS_ERROR",
  error,
  query,
});
export const getCarsReset = () => ({ type: "GET_CARS_RESET" });

const getCarsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_CARS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
        queryparam: "",
      };
    }
    case "GET_CARS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
        queryparam: action.query,
      };
    }
    case "GET_CARS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
        queryparam: action.query,
      };
    }
    case "GET_CARS_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const getCarsResult = (query) => (dispatch) => {
  const payload = { ...API_CONFIG.GET_SEARCH_RESULT };
  console.log(query);
  if (
    !query ||
    !query?.toString()?.includes("group=") ||
    !query?.toString()?.includes("search=")
  ) {
    return;
  }
  payload.url += `?${query}`;
  dispatch(apiBegin());
  dispatch(getCarsStart());
  apiClient(payload)
    .then((res) => {
      console.log("success");
      dispatch(apiSuccess());
      dispatch(getCarsSuccess(res.data.data, query));
    })
    .catch((err) => {
      dispatch(apiFailure(err));

      dispatch(getCarsError(err, query));
    });
};
/* --------------------------------- */

const getSortKeyStart = () => ({ type: "GET_SORT_KEY_START" });
const getSortKeySuccess = (payload, query) => ({
  type: "GET_SORT_KEY_SUCCESS",
  payload,
  query,
});
const getSortKeyError = (error, query) => ({
  type: "GET_SORT_KEY_ERROR",
  error,
  query,
});
export const getSortKeyReset = () => ({ type: "GET_SORT_KEY_RESET" });

const getSortKeyReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_SORT_KEY_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: {
          "Cars Models": [
            { display: "Launch Year", value: "launch_year" },
            { display: "Title", value: "title" },
          ],
          "Auction Data": [
            { display: "Auction Date", value: "auction_date" },
            { display: "Price", value: "price.sort_price" },
          ],
          "Cars For Sale": [{ display: "Price", value: "price.sort_price" }],
        },
      };
    }
    case "GET_SORT_KEY_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: {
          "Cars Models": [
            { display: "Launch Year", value: "launch_year" },
            { display: "title", value: "title" },
          ],
          "Auction Data": [
            { display: "Auction Date", value: "auction_date" },
            { display: "Price", value: "price.sort_price" },
          ],
          "Cars For Sale": [{ display: "Price", value: "price.sort_price" }],
        },
      };
    }
    case "GET_SORT_KEY_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_SORT_KEY_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return {
        ...state,
        data: {
          "Cars Models": [
            { display: "Launch Year", value: "launch_year" },
            { display: "title", value: "title" },
          ],
          "Auction Data": [
            { display: "Auction Date", value: "auction_date" },
            { display: "Price", value: "price.sort_price" },
          ],
          "Cars For Sale": [{ display: "Price", value: "price.sort_price" }],
        },
      };
    }
  }
};

const getSortKeyResult = (query) => (dispatch) => {
  const payload = API_CONFIG.GET_SORT_KEYS;
  // payload.url += `?${query}`;
  dispatch(apiBegin());
  dispatch(getSortKeyStart());
  apiClient(payload)
    .then((res) => {
      console.log("success");
      dispatch(apiSuccess());
      dispatch(getSortKeySuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(apiFailure(err));

      dispatch(getSortKeyError(err, query));
    });
};

/* ------------------------------- */
const apiCall = {
  getSearchResult,
  getFilterResult,
  getCarsResult,
  getSortKeyResult,
};
export default apiCall;

export const searchReducer = {
  searchData: getResultReducer,
  sideBarData: getFilterReducer,
  compareList: compareListReducer,
  carsResult: getCarsReducer,
  carsSortingKey: getSortKeyReducer,
};
