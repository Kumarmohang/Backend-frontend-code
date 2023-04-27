import apiClient from "../../utils/apiClient";
import { apiBegin, apiSuccess, apiFailure } from "../../logic";

const API_CONFIG = {
  GET_SEARCH_FILTERS: {
    method: "GET",
    url: "/advance-search-filter",
  },
};

const defaultState = {
  loading: true,
  isError: false,
  error: null,
  flag: false,
  data: null,
};

/* ======================== */
const getFilterStart = () => ({ type: "GET_SEARCH_FILTER_START" });
const getFilterSuccess = (payload) => ({
  type: "GET_SEARCH_FILTER_SUCCESS",
  payload,
});
const getFilterError = (error) => ({ type: "GET_SEARCH_FILTER_ERROR", error });
export const getFilterReset = () => ({ type: "GET_SEARCH_FILTER_RESET" });

const getFilterReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_SEARCH_FILTER_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_SEARCH_FILTER_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
      };
    }
    case "GET_SEARCH_FILTER_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_SEARCH_FILTER_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const getFilterResult =
  (query = "") =>
  (dispatch) => {
    const payload = { ...API_CONFIG.GET_SEARCH_FILTERS };
    if (query) {
      payload.url += `?${query}`;
    }
    dispatch(apiBegin());
    dispatch(getFilterStart());
    apiClient(payload)
      .then((res) => {
        console.log("success");
        dispatch(apiSuccess());
        dispatch(getFilterSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(apiFailure(err));

        dispatch(getFilterError(err));
      });
  };

const apiCall = getFilterResult;
export default apiCall;

export const searchFilterReducer = {
  advanceSearchFilter: getFilterReducer,
};
