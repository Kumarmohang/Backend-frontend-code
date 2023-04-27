import apiClient from "../../utils/apiClient";
import { apiBegin, apiSuccess, apiFailure } from "../../logic";

// import dummyData from "./data";

const API_CONFIG = {
  GET_SEARCH_RESULT: {
    method: "GET",
    url: "/details",
  },
  GET_CIRCUIT_DETAILS: {
    method: "GET",
    url: "/circuits/details",
  },
  GET_CLUB_DETAILS: {
    method: "GET",
    url: "/clubs/details",
  },
  GET_DRIVER_DETAILS: {
    method: "GET",
    url: "/drivers/details",
  },
  GET_DEALER_DETAILS: {
    method: "GET",
    url: "/details",
  },
  GET_EVENT_DETAILS: {
    method: "GET",
    url: "/event/details",
  },
  GET_COLLECTOR_DETAILS: {
    method: "GET",
   url: "/influencers/details",
  },
};

const defaultState = {
  loading: true,
  isError: false,
  error: null,
  flag: false,
  data: null,
};

const getDetailsStart = () => ({ type: "GET_DETAILS_START" });
const getDetailsSuccess = (payload) => ({
  type: "GET_DETAILS_SUCCESS",
  payload,
});
const getDetailsError = (error) => ({ type: "GET_DETAILS_ERROR", error });
export const getDetailsReset = () => ({ type: "GET_DETAILS_RESET" });

const getDetailsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_DETAILS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_DETAILS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
      };
    }
    case "GET_DETAILS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_DETAILS_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

const getDetails = (query, id) => (dispatch) => {
  const payload = { ...API_CONFIG.GET_SEARCH_RESULT };
  payload.url += `${query}`;
  dispatch(apiBegin());
  dispatch(getDetailsStart());
  apiClient(payload)
    .then((res) => {
      dispatch(apiSuccess());
      dispatch(getDetailsSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(apiFailure(err));

      dispatch(getDetailsError(err));
    });
};

export default getDetails;

/* -------------------------------- */
const getCircuitDetailsStart = () => ({ type: "GET_CIRCUIT_DETAILS_START" });
const getCircuitDetailsSuccess = (payload) => ({
  type: "GET_CIRCUIT_DETAILS_SUCCESS",
  payload,
});
const getCircuitDetailsError = (error) => ({
  type: "GET_CIRCUIT_DETAILS_ERROR",
  error,
});
export const getCircuitDetailsReset = () => ({
  type: "GET_CIRCUIT_DETAILS_RESET",
});

const getCircuitDetailsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_CIRCUIT_DETAILS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_CIRCUIT_DETAILS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
      };
    }
    case "GET_CIRCUIT_DETAILS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_CIRCUIT_DETAILS_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const getCircuitDetails = (query) => (dispatch) => {
  const payload = { ...API_CONFIG.GET_CIRCUIT_DETAILS };
  payload.url += `${query}`;
  dispatch(apiBegin());
  dispatch(getCircuitDetailsStart());
  apiClient(payload)
    .then((res) => {
      dispatch(apiSuccess());
      dispatch(getCircuitDetailsSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(apiFailure(err));

      dispatch(getCircuitDetailsError(err));
    });
};

/* -------------------------------- */

/* ----------------------------- */
const getClubDetailsStart = () => ({ type: "GET_CLUB_DETAILS_START" });
const getClubDetailsSuccess = (payload) => ({
  type: "GET_CLUB_DETAILS_SUCCESS",
  payload,
});
const getClubDetailsError = (error) => ({
  type: "GET_CLUB_DETAILS_ERROR",
  error,
});
export const getClubDetailsReset = () => ({
  type: "GET_CLUB_DETAILS_RESET",
});

const getClubDetailsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_CLUB_DETAILS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_CLUB_DETAILS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
      };
    }
    case "GET_CLUB_DETAILS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_CLUB_DETAILS_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const getClubDetails = (query) => (dispatch) => {
  const payload = { ...API_CONFIG.GET_CLUB_DETAILS };
  payload.url += `${query}`;
  dispatch(apiBegin());

  dispatch(getClubDetailsStart());
  apiClient(payload)
    .then((res) => {
      dispatch(apiSuccess());
      dispatch(getClubDetailsSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(apiFailure(err));

      dispatch(getClubDetailsError(err));
    });
};
/* ---------------------------- */

/* ----------------------------- */
const getDriveDetailsStart = () => ({ type: "GET_DRIVER_DETAILS_START" });
const getDriveDetailsSuccess = (payload) => ({
  type: "GET_DRIVER_DETAILS_SUCCESS",
  payload,
});
const getDriveDetailsError = (error) => ({
  type: "GET_DRIVER_DETAILS_ERROR",
  error,
});
export const getDriveDetailsReset = () => ({
  type: "GET_DRIVER_DETAILS_RESET",
});

const getDriveDetailsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_DRIVER_DETAILS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_DRIVER_DETAILS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
      };
    }
    case "GET_DRIVER_DETAILS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_DRIVER_DETAILS_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const getDriveDetails = (query) => (dispatch) => {
  const payload = { ...API_CONFIG.GET_DRIVER_DETAILS };
  payload.url += `${query}`;
  dispatch(apiBegin());

  dispatch(getDriveDetailsStart());
  apiClient(payload)
    .then((res) => {
      dispatch(apiSuccess());
      dispatch(getDriveDetailsSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(apiFailure(err));

      dispatch(getDriveDetailsError(err));
    });
};
/* ---------------------------- */

/* -------------------------------- */
const getDealerDetailsStart = () => ({ type: "GET_DEALER_DETAILS_START" });
const getDealerDetailsSuccess = (payload) => ({
  type: "GET_DEALER_DETAILS_SUCCESS",
  payload,
});
const getDealerDetailsError = (error) => ({
  type: "GET_DEALER_DETAILS_ERROR",
  error,
});
export const getDealerDetailsReset = () => ({
  type: "GET_DEALER_DETAILS_RESET",
});

const getDealerDetailsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_DEALER_DETAILS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_DEALER_DETAILS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
      };
    }
    case "GET_DEALER_DETAILS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_DEALER_DETAILS_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const getDealerDetails = (query) => (dispatch) => {
  const payload = { ...API_CONFIG.GET_DEALER_DETAILS };
  payload.url += `${query}`;
  dispatch(apiBegin());
  dispatch(getDealerDetailsStart());
  apiClient(payload)
    .then((res) => {
      dispatch(apiSuccess());
      dispatch(getDealerDetailsSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(apiFailure(err));

      dispatch(getDealerDetailsError(err));
    });
};

/* -------------------------------- */

/* -------------------------------- */
const getEventDetailsStart = () => ({ type: "GET_EVENT_DETAILS_START" });
const getEventDetailsSuccess = (payload) => ({
  type: "GET_EVENT_DETAILS_SUCCESS",
  payload,
});
const getEventDetailsError = (error) => ({
  type: "GET_EVENT_DETAILS_ERROR",
  error,
});
export const getEventDetailsReset = () => ({
  type: "GET_EVENT_DETAILS_RESET",
});

const getEventDetailsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_EVENT_DETAILS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_EVENT_DETAILS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
      };
    }
    case "GET_EVENT_DETAILS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_EVENT_DETAILS_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const getEventDetails = (query) => (dispatch) => {
  const payload = { ...API_CONFIG.GET_EVENT_DETAILS };
  payload.url += `${query}`;
  dispatch(apiBegin());
  dispatch(getEventDetailsStart());
  apiClient(payload)
    .then((res) => {
      dispatch(apiSuccess());
      dispatch(getEventDetailsSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(apiFailure(err));

      dispatch(getEventDetailsError(err));
    });
};

/* -------------------------------- */

/* ----------------------------- */
const getCollectorDetailsStart = () => ({
  type: "GET_COLLECTOR_DETAILS_START",
});
const getCollectorDetailsSuccess = (payload) => ({
  type: "GET_COLLECTOR_DETAILS_SUCCESS",
  payload,
});
const getCollectorDetailsError = (error) => ({
  type: "GET_COLLECTOR_DETAILS_ERROR",
  error,
});
export const getCollectorDetailsReset = () => ({
  type: "GET_COLLECTOR_DETAILS_RESET",
});

const getCollectorDetailsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_COLLECTOR_DETAILS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_COLLECTOR_DETAILS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.payload,
      };
    }
    case "GET_COLLECTOR_DETAILS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_COLLECTOR_DETAILS_RESET": {
      return {
        ...defaultState,
      };
    }
    default: {
      return { ...state };
    }
  }
};

export const getCollectorDetails = (query) => (dispatch) => {
  const payload = { ...API_CONFIG.GET_COLLECTOR_DETAILS };
  payload.url += `${query}`;
  dispatch(apiBegin());

  dispatch(getCollectorDetailsStart());
  apiClient(payload)
    .then((res) => {
      dispatch(apiSuccess());
      dispatch(getCollectorDetailsSuccess(res.data.data));
    })
    .catch((err) => {
      dispatch(apiFailure(err));

      dispatch(getCollectorDetailsError(err));
    });
};
/* ---------------------------- */

export const detailsReducer = {
  detailedData: getDetailsReducer,
  circuitDetails: getCircuitDetailsReducer,
  clubDetails: getClubDetailsReducer,
  driverDetail: getDriveDetailsReducer,
  dealerDetail: getDealerDetailsReducer,
  eventDetail: getEventDetailsReducer,
  collectorDetail: getCollectorDetailsReducer,
};
