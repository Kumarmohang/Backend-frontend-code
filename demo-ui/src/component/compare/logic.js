import apiClient from "../../utils/apiClient";
import { apiBegin, apiSuccess, apiFailure } from "../../logic";

// import dummyData from "./data";

const API_CONFIG = {
  GET_COMPARING_CARS_DETAILS: {
    method: "GET",
    url: "/compare",
  },
};

const defaultState = {
  loading: true,
  isError: false,
  error: null,
  flag: false,
  data: null,
};

const getComparingCarsStart = () => ({
  type: "GET_COMPARING_CARS_DETAILS_START",
});
const getComparingCarsSuccess = (payload) => ({
  type: "GET_COMPARING_CARS_DETAILS_SUCCESS",
  payload,
});
const getComparingCarsError = (error) => ({
  type: "GET_COMPARING_CARS_DETAILS_ERROR",
  error,
});
export const getComparingCarsReset = () => ({
  type: "GET_COMPARING_CARS_DETAILS_RESET",
});

const getComparingCarsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_COMPARING_CARS_DETAILS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_COMPARING_CARS_DETAILS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
      };
    }
    case "GET_COMPARING_CARS_DETAILS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_COMPARING_CARS_DETAILS_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const getComparingCars = (query) => (dispatch) => {
  const payload = { ...API_CONFIG.GET_COMPARING_CARS_DETAILS };
  payload.url += `${query}`;
  dispatch(apiBegin());

  dispatch(getComparingCarsStart());
  apiClient(payload)
    .then((res) => {
      dispatch(apiSuccess());
      dispatch(getComparingCarsSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(apiFailure(err));
      dispatch(getComparingCarsError(err));
    });
};

export const comparisonReducer = {
  comparisonData: getComparingCarsReducer,
};
