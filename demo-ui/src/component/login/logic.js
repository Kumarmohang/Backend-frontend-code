import apiClient, { session, headerUtils } from "../../utils";
import { apiBegin, apiSuccess, apiFailure } from "../../logic";
import { checkIfLogin } from "../../utils/sessionManagement";

const apiConfig = {
  LOGIN: {
    method: "POST",
    url: "/users/login/",
    data: {},
  },
};

export const resetFlag = () => ({
  type: "LOGIN_RESET",
});

const loginCall = () => ({
  type: "LOGIN_API_CALL",
});

const loginSuccess = (loginData) => ({
  type: "LOGIN_SUCCESS",
  loginData,
});

const loginFailure = (error) => ({
  type: "LOGIN_FAILURE",
  error,
});

const defaultState = {
  loading: false,
  isError: false,
  data: null,
  error: {},
  flag: checkIfLogin(),
};

export const LoginReducer = (state, action) => {
  if (typeof state === "undefined") {
    return defaultState;
  }
  switch (action.type) {
    case "LOGIN_API_CALL":
      return {
        ...state,
        loading: true,
        isError: false,
        flag: false,
        error: {},
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        data: action.loginData,
        loading: false,
        isError: false,
        flag: true,
      };
    case "LOGIN_FAILURE":
      return {
        ...state,
        loading: false,
        isError: true,
        error: action.error,
      };
    case "LOGIN_RESET":
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

const startLogin = (payload) => (dispatch) => {
  const apiPayload = { ...apiConfig.LOGIN };
  apiPayload.data.username = payload.userName;
  apiPayload.data.password = payload.password;
  dispatch(apiBegin());
  dispatch(loginCall());
  apiClient(apiPayload)
    .then((res) => {
      dispatch(loginSuccess(res.data.data));
      session.addSession(res.data.data);
      headerUtils.setHeader(res.data.data.token);
      dispatch(apiSuccess());
    })
    .catch((err) => {
      dispatch(loginFailure(err));
      dispatch(apiFailure(err));
    });
};

export default startLogin;

export const loginDataReducer = {
  userData: LoginReducer,
};
