import apiClient from "../../utils/apiClient";
import { apiBegin, apiSuccess, apiFailure } from "../../logic";

const API_CONFIG = {
  GET_BRAND_SERIES: {
    method: "GET",
    url: "/cars/series",
  },

  GET_SEARCH_RESULT: {
    method: "GET",
    url: "/advanceSearchResults",
  },
};

const defaultState = {
  loading: false,
  isError: false,
  error: null,
  flag: false,
  data: null,
  initialCount: 0,
  queryparam: "",
};

const getAdvanceResultStart = () => ({ type: "GET_RESULT_START" });
const getAdvanceResultSuccess = (payload, query) => ({
  type: "GET_RESULT_SUCCESS",
  payload,
  query,
});
const getAdvanceResultError = (error, query) => ({
  type: "GET_RESULT_ERROR",
  error,
  query,
});
export const getAdvanceResultReset = () => ({ type: "GET_RESULT_RESET" });

const getAdvanceResultReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_RESULT_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
        initialCount: 0,
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
        initialCount: action?.payload?.total,
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
        initialCount: 0,
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

const defaultStateForSeries = {
  loading: false,
  isError: false,
  error: null,
  flag: false,
  seriesData: null,
  queryparam: "",
};

const getSeriesResultStart = () => ({ type: "GET_RESULT_START_SERIES" });
const getSeriesResultSuccess = (payload, query) => ({
  type: "GET_RESULT_SUCCESS_SERIES",
  payload,
  query,
});
const getSeriesResultError = (error, query) => ({
  type: "GET_RESULT_ERROR_SERIES",
  error,
  query,
});
export const getSeriesResultReset = () => ({ type: "GET_RESULT_RESET_SERIES" });

const getSeriesResultReducer = (state = defaultStateForSeries, action) => {
  switch (action.type) {
    case "GET_RESULT_START_SERIES": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        seriesData: null,
        queryparam: "",
      };
    }
    case "GET_RESULT_SUCCESS_SERIES": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        seriesData: action.payload,
        queryparam: action.query,
      };
    }
    case "GET_RESULT_ERROR_SERIES": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        seriesData: null,
        queryparam: action.query,
      };
    }
    case "GET_RESULT_RESET_SERIES": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const getSeriesSearchResult = (query) => (dispatch) => {
  //   const urlSearchParams = new URLSearchParams(query);
  const payload = { ...API_CONFIG.GET_BRAND_SERIES };

  /*  if (!query) {
    return;
  } */

  payload.url += `?${query}&pageNo=0&fetchSize=24`;

  dispatch(apiBegin());
  dispatch(getSeriesResultStart());
  apiClient(payload)
    .then((res) => {
      dispatch(apiSuccess());
      dispatch(getSeriesResultSuccess(res.data));
    })
    .catch((err) => {
      dispatch(apiFailure(err));

      dispatch(getSeriesResultError(err, query));
    });
};

const getAdvanceSearchResult = (query) => (dispatch) => {
  //   const urlSearchParams = new URLSearchParams(query);
  const payload = { ...API_CONFIG.GET_SEARCH_RESULT };

  /*  if (!query) {
    return;
  } */

  payload.url += `?${query}&pageNo=0&fetchSize=24`;

  dispatch(apiBegin());
  dispatch(getAdvanceResultStart());
  apiClient(payload)
    .then((res) => {
      dispatch(apiSuccess());
      dispatch(getAdvanceResultSuccess(res.data));
    })
    .catch((err) => {
      dispatch(apiFailure(err));

      dispatch(getAdvanceResultError(err, query));
    });
};

/* ------------------------------- */
const apiCallForAdvanceSearch = {
  getAdvanceSearchResult,
};

export default apiCallForAdvanceSearch;
export const apiCallForCarSeries = {
  getSeriesSearchResult,
};
export const advanceSearchReducer = {
  searchAdvanceData: getAdvanceResultReducer,
  getBrandSeriesData: getSeriesResultReducer,
};
