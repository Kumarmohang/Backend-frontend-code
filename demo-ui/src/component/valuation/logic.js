import apiClient, { session, headerUtils } from "../../utils";
import { apiBegin, apiSuccess, apiFailure } from "../../logic";
import { checkIfValuation } from "../../utils/sessionManagement";

const apiConfig = {
  VALUATION: {
    method: "POST",
    url: "/get-valuation/",
    data: {},
  },
};

export const resetFlag = () => ({
  type: "VALUATION_RESET",
});

const valuationCall = () => ({
  type: "VALUATION_API_CALL",
});

const valuationSuccess = (valuationData) => ({
  type: "VALUATION_SUCCESS",
  valuationData,
});

const valuationFailure = (error) => ({
  type: "VALUATION_FAILURE",
  error,
});

const defaultState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: false,
};

export const ValuationReducer = (state, action) => {
  if (typeof state === "undefined") {
    return defaultState;
  }
  switch (action.type) {
    case "VALUATION_API_CALL":
      return {
        ...state,
        loading: true,
        isError: false,
        flag: false,
        error: {},
      };
    case "VALUATION_SUCCESS":
      return {
        ...state,
        data: action.valuationData,
        loading: false,
        isError: false,
        flag: true,
      };
    case "VALUATION_FAILURE":
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
      };
    case "VALUATION_RESET":
      return {
        ...state,
        loading: false,
        error: null,
        isError: false,
        flag: false,
      };
    default:
      return { ...state };
  }
};

const startValuation = (payload) => (dispatch) => {
  const apiPayload = { ...apiConfig.VALUATION };
  apiPayload.data = { ...payload };
  // dispatch(apiBegin());
  dispatch(valuationCall());
  apiClient(apiPayload)
    .then((res) => {
      dispatch(valuationSuccess(res.data.data));
      // dispatch(apiSuccess());
    })
    .catch((err) => {
      dispatch(valuationFailure(err));
      // dispatch(apiFailure(err));
    });
};

export default startValuation;

export const valuationDataReducer = {
  valuationData: ValuationReducer,
};
