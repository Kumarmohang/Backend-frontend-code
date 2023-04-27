import axios from "axios";
import { getAuthHeader } from "./sessionManagement";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const setHeader = (token) => {
  apiClient.defaults.headers.common.Authorization = `${token}`;
};

export const discardHeader = () => {
  delete apiClient.defaults.headers.common.Authorization;
};

apiClient.defaults.headers.common.Authorization = getAuthHeader();

/**
 * @type {import("axios").AxiosInstance}
 */
export default apiClient;
