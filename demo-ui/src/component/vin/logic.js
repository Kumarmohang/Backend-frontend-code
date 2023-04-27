import apiClient from "../../utils/apiClient";
import { apiBegin, apiSuccess, apiFailure } from "../../logic";

const API_CONFIG = {
  GET_VIN_RESULT: {
    method: "GET",
    url: "/vin",
  },
};

const defaultState = {
  loading: true,
  isError: false,
  error: null,
  flag: false,
  data: null,
};

const getVinStart = () => ({ type: "GET_VIN_START" });
const getVinSuccess = (payload) => ({
  type: "GET_VIN_SUCCESS",
  payload,
});
const getVinError = (error) => ({ type: "GET_VIN_ERROR", error });
export const getVinReset = () => ({ type: "GET_VIN_RESET" });

const getVinReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_VIN_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_VIN_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
      };
    }
    case "GET_VIN_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_VIN_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const getVinResult = (query) => (dispatch) => {
  const payload = { ...API_CONFIG.GET_VIN_RESULT };
  console.log(payload);
  payload.url += `?${query}`;
  dispatch(apiBegin());

  dispatch(getVinStart());
  apiClient(payload)
    .then((res) => {
      dispatch(getVinSuccess(res.data.data));
      dispatch(apiSuccess());
    })
    .catch((err) => {
      dispatch(getVinError(err));
      dispatch(apiFailure(err));
    });
};

const apiCall = (query) => (dispatch) => {
  dispatch(getVinResult(query));
};
export default apiCall;

export const vinReducer = {
  vinResult: getVinReducer,
  // driverResult: getDriversReducer,
};
