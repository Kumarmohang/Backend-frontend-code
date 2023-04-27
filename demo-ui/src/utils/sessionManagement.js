import { deleteData, getData, setData } from "./storageService";

export const clearSession = () => {
  deleteData();
};

export const addSession = (session) => {
  setData("isLoggedIn", true);
  setData(`Token`, session.token);
};

export const checkIfLogin = () => getData("isLoggedIn") || false;

export const getAuthHeader = () => getData(`Token`);
