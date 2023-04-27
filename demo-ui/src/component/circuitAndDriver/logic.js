import apiClient from "../../utils/apiClient";
import { apiBegin, apiSuccess, apiFailure } from "../../logic";

// import { cardArray } from "./data";

const API_CONFIG = {
  GET_CIRCUIT_RESULT: {
    payload: {
      method: "GET",
      url: "/circuits",
    },
    pageName: "Circuits",
  },
  GET_DRIVERS_RESULT: {
    payload: {
      method: "GET",
      url: "/drivers",
    },
    pageName: "Drivers",
  },
  GET_DEALERS_RESULT: {
    payload: {
      method: "GET",
      url: "/dealers",
    },
    pageName: "Dealers",
  },
  GET_CLUBS_RESULT: {
    payload: {
      method: "GET",
      url: "/clubs",
    },
    pageName: "Clubs",
  },
  GET_DEALERS_CAR_RESULT: {
    payload: {
      method: "GET",
      url: "/search",
    },
    pageName: "Cars by dealer",
  },
  GET_COLLECTORS_RESULT: {
    payload: {
      method: "GET",
      url: "/influencers/",
    },
    pageName: "Influencers",
  },
  GET_COLLECTORS_CARS_RESULT: {
    payload: {
      method: "GET",
      url: "/influencers/cars/",
    },
    pageName: "Collector Cars",
  },
};

const defaultState = {
  loading: true,
  isError: false,
  error: null,
  flag: false,
  data: null,
};

const getResultStart = () => ({ type: "GET_CIRCUITS_START" });
const getResultSuccess = (payload, pageFor) => ({
  type: "GET_CIRCUITS_SUCCESS",
  payload,
  pageFor,
});
const getResultError = (error) => ({ type: "GET_CIRCUITS_ERROR", error });
export const getResultReset = () => ({ type: "GET_CIRCUITS_RESET" });

const getResultReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_CIRCUITS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_CIRCUITS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: { ...state.data, [action.pageFor]: action.payload },
      };
    }
    case "GET_CIRCUITS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_CIRCUITS_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const getCircuitOrDriverResult = (apiConfig, query) => (dispatch) => {
  const payload = { ...apiConfig.payload };
  if (query) {
    payload.url += `?${query}`;
  }
  dispatch(apiBegin());

  dispatch(getResultStart());
  apiClient(payload)
    .then((res) => {
      dispatch(getResultSuccess(res.data.data, apiConfig.pageName));
      dispatch(apiSuccess());
    })
    .catch((err) => {
      dispatch(getResultError(err));
      dispatch(apiFailure(err));
    });
};

const apiCall = (dataFor, query) => (dispatch) => {
  if (dataFor === "Circuits") {
    dispatch(getCircuitOrDriverResult(API_CONFIG.GET_CIRCUIT_RESULT, query));
  } else if (dataFor === "Drivers") {
    dispatch(getCircuitOrDriverResult(API_CONFIG.GET_DRIVERS_RESULT, query));
  } else if (dataFor === "Dealers") {
    dispatch(getCircuitOrDriverResult(API_CONFIG.GET_DEALERS_RESULT, query));
  } else if (dataFor === "Clubs") {
    dispatch(getCircuitOrDriverResult(API_CONFIG.GET_CLUBS_RESULT, query));
  } else if (dataFor === "Cars by dealer") {
    dispatch(
      getCircuitOrDriverResult(API_CONFIG.GET_DEALERS_CAR_RESULT, query)
    );
  } else if (dataFor === "Influencers") {
    dispatch(getCircuitOrDriverResult(API_CONFIG.GET_COLLECTORS_RESULT, query));
  } else if (dataFor === "Collector Cars") {
    dispatch(
      getCircuitOrDriverResult(API_CONFIG.GET_COLLECTORS_CARS_RESULT, query)
    );
  }
};
export default apiCall;

export const circuitAndDriverReducer = {
  circuitOrDriverResult: getResultReducer,
  // driverResult: getDriversReducer,
};
