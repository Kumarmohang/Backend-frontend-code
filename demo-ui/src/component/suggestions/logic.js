import apiClient from "../../utils/apiClient";
import { apiBegin, apiSuccess, apiFailure } from "../../logic";

const API_CONFIG = {
  GET_ALL_SUGGESTIONS: {
    url: "/suggestions/",
    method: "GET",
  },
  POST_NEW_SUGGESTIONS: {
    url: "/suggestions/",
    method: "POST",
    data: {},
  },
  PUT_UPDATE_SUGGESTION: {
    url: "/suggestions/",
    method: "PUT",
    data: {},
  },
};

const defaultState = {
  loading: false,
  isError: false,
  error: null,
  flag: false,
  data: null,
};

const getAllSuggestionsStart = () => ({ type: "GET_ALL_SUGGESTIONS_START" });
const getAllSuggestionsSuccess = (payload) => ({
  type: "GET_ALL_SUGGESTIONS_SUCCESS",
  data: payload,
});
const getAllSuggestionsError = (error) => ({
  type: "GET_ALL_SUGGESTIONS_ERROR",
  error,
});
export const getAllSuggestionsReset = () => ({
  type: "GET_ALL_SUGGESTIONS_RESET",
});

const getAllSuggestionsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "GET_ALL_SUGGESTIONS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "GET_ALL_SUGGESTIONS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.data,
      };
    }
    case "GET_ALL_SUGGESTIONS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "GET_ALL_SUGGESTIONS_RESET": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    default:
      return state;
  }
};

export const getAllSuggestions = (query) => {
  return (dispatch) => {
    const apiConfig = { ...API_CONFIG.GET_ALL_SUGGESTIONS };
    if (query) {
      apiConfig.url += `?${query}`;
    }
    dispatch(apiBegin());
    dispatch(getAllSuggestionsStart());
    apiClient(apiConfig)
      .then((response) => {
        dispatch(apiSuccess());
        dispatch(getAllSuggestionsSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(apiFailure());
        dispatch(getAllSuggestionsError(error));
      });
  };
};
/* ----------------------------------------------- */

const postNewSuggestionsStart = () => ({ type: "POST_NEW_SUGGESTIONS_START" });
const postNewSuggestionsSuccess = (payload) => ({
  type: "POST_NEW_SUGGESTIONS_SUCCESS",
  data: payload,
});
const postNewSuggestionsError = (error) => ({
  type: "POST_NEW_SUGGESTIONS_ERROR",
  error,
});
export const postNewSuggestionsReset = () => ({
  type: "POST_NEW_SUGGESTIONS_RESET",
});

const postNewSuggestionsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "POST_NEW_SUGGESTIONS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "POST_NEW_SUGGESTIONS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.data,
      };
    }
    case "POST_NEW_SUGGESTIONS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "POST_NEW_SUGGESTIONS_RESET": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    default:
      return state;
  }
};

export const postNewSuggestions = (data) => {
  return (dispatch) => {
    const apiConfig = { ...API_CONFIG.POST_NEW_SUGGESTIONS };
    apiConfig.data = data;
    dispatch(apiBegin());
    dispatch(postNewSuggestionsStart());
    apiClient(apiConfig)
      .then((response) => {
        dispatch(apiSuccess());
        dispatch(postNewSuggestionsSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(apiFailure());
        dispatch(postNewSuggestionsError(error));
      });
  };
};

/* ----------------------------------------------- */

/* ----------------------------------------------- */

const putUpdateSuggestionsStart = () => ({
  type: "PUT_UPDATE_SUGGESTIONS_START",
});
const putUpdateSuggestionsSuccess = (payload) => ({
  type: "PUT_UPDATE_SUGGESTIONS_SUCCESS",
  data: payload,
});
const putUpdateSuggestionsError = (error) => ({
  type: "PUT_UPDATE_SUGGESTIONS_ERROR",
  error,
});
export const putUpdateSuggestionsReset = () => ({
  type: "PUT_UPDATE_SUGGESTIONS_RESET",
});

const putUpdateSuggestionsReducer = (state = defaultState, action) => {
  switch (action.type) {
    case "PUT_UPDATE_SUGGESTIONS_START": {
      return {
        ...state,
        loading: true,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    case "PUT_UPDATE_SUGGESTIONS_SUCCESS": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: true,
        data: action.data,
      };
    }
    case "PUT_UPDATE_SUGGESTIONS_ERROR": {
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
        flag: false,
        data: null,
      };
    }
    case "PUT_UPDATE_SUGGESTIONS_RESET": {
      return {
        ...state,
        loading: false,
        isError: false,
        error: null,
        flag: false,
        data: null,
      };
    }
    default:
      return state;
  }
};

export const putUpdateSuggestions = (data) => {
  return (dispatch) => {
    const apiConfig = { ...API_CONFIG.PUT_UPDATE_SUGGESTION };
    apiConfig.data = data;
    dispatch(apiBegin());
    dispatch(putUpdateSuggestionsStart());
    apiClient(apiConfig)
      .then((response) => {
        dispatch(apiSuccess());
        dispatch(putUpdateSuggestionsSuccess(response.data.data));
      })
      .catch((error) => {
        dispatch(apiFailure());
        dispatch(putUpdateSuggestionsError(error));
      });
  };
};

/* ----------------------------------------------- */

export const suggestionReducer = {
  suggestionList: getAllSuggestionsReducer,
  postNewSuggestions: postNewSuggestionsReducer,
  updateSuggestion: putUpdateSuggestionsReducer,
};
