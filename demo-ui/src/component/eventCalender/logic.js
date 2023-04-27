import apiClient from "../../utils/apiClient";
import { apiBegin, apiSuccess, apiFailure } from "../../logic";

const API_CONFIG = {
  GET_EVENT_CALENDER: {
    method: "GET",
    url: "/event/calender",
  },
  GET_EVENT_YEARS: {
    method: "GET",
    url: "/event/years/",
  },
};

const defaultState = {
  loading: true,
  isError: false,
  error: null,
  flag: false,
  data: null,
};

const getEventCalenderStart = () => ({ type: "GET_EVENT_CALENDER_START" });
const getEventCalenderSuccess = (payload) => ({
  type: "GET_EVENT_CALENDER_SUCCESS",
  payload,
});
const getEventCalenderError = (error) => ({
  type: "GET_EVENT_CALENDER_ERROR",
  error,
});
export const getEventCalenderReset = () => ({
  type: "GET_EVENT_CALENDER_RESET",
});

const getEventCalenderReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_EVENT_CALENDER_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_EVENT_CALENDER_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
      };
    }
    case "GET_EVENT_CALENDER_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_EVENT_CALENDER_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const getEventCalender =
  (query = "") =>
  (dispatch) => {
    const payload = { ...API_CONFIG.GET_EVENT_CALENDER };
    payload.url += `?${query}`;
    dispatch(apiBegin());
    dispatch(getEventCalenderStart());
    apiClient(payload)
      .then((res) => {
        dispatch(apiSuccess());
        dispatch(getEventCalenderSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(apiFailure(err));

        dispatch(getEventCalenderError(err));
      });
  };

/* ======================== */
const getEventYearsStart = () => ({ type: "GET_EVENT_YEARS_START" });
const getEventYearsSuccess = (payload) => ({
  type: "GET_EVENT_YEARS_SUCCESS",
  payload,
});
const getEventYearsError = (error) => ({
  type: "GET_EVENT_YEARS_ERROR",
  error,
});
export const getEventYearsReset = () => ({ type: "GET_EVENT_YEARS_RESET" });

const getEventYearsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_EVENT_YEARS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_EVENT_YEARS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
      };
    }
    case "GET_EVENT_YEARS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_EVENT_YEARS_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const getEventYears =
  (query = "") =>
  (dispatch) => {
    const payload = { ...API_CONFIG.GET_EVENT_YEARS };
    payload.url += `?${query}`;
    dispatch(apiBegin());
    dispatch(getEventYearsStart());
    apiClient(payload)
      .then((res) => {
        console.log("success");
        dispatch(apiSuccess());
        dispatch(getEventYearsSuccess(res.data.data));
      })
      .catch((err) => {
        dispatch(apiFailure(err));

        dispatch(getEventYearsError(err));
      });
  };

const apiCall = { getEventCalender, getEventYears };
export default apiCall;

export const eventCalenderReducer = {
  eventCalender: getEventCalenderReducer,
  eventYears: getEventYearsReducer,
};
