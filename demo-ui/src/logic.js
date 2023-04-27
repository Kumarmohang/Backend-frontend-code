export const apiBegin = () => ({
  type: "BEGIN",
});

export const apiSuccess = () => ({
  type: "SUCCESS",
});

export const apiFailure = (error) => ({
  type: "FAILURE",
  error: {
    ...error,
  },
});

export const resetCommon = () => ({
  type: "RESET",
});

const defaultState = {
  loading: true,
  isError: false,
  error: {},
  flag: false,
};

export const commonApiReducer = (state, action) => {
  if (typeof state === "undefined") {
    return defaultState;
  }
  switch (action.type) {
    case "BEGIN":
      return {
        ...state,
        loading: true,
        flag: false,
        error: {},
      };
    case "SUCCESS":
      return {
        ...state,
        loading: false,
        isError: false,
        flag: true,
      };
    case "FAILURE":
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
      };
    case "RESET":
      return {
        ...defaultState,
      };
    default:
      return { ...state };
  }
};

export const updateLocation = (location) => ({
  type: "UPDATE_LOCATION",
  data: location,
});

const defaultLocation = {
  pathname: window.location.pathname,
  search: window.location.search,
};

export const locationReducer = (state, action) => {
  if (typeof state === "undefined") {
    return defaultLocation;
  }
  switch (action.type) {
    case "UPDATE_LOCATION":
      return {
        pathname: action.data.pathname,
        search: action.data.search,
      };
    default:
      return { ...state };
  }
};

export const commonReducer = {
  apiStatus: commonApiReducer,
  location: locationReducer,
};
