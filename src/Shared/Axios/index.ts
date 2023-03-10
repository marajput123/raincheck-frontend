import axios from "axios";
import { accessTokenHeaderName } from "src/Shared/Contants";
import { getAccessTokenFromStorage, getContentFromLocalStorage, setAuthInStorage } from "../Helpers";

console.log(process.env.REACT_APP_LOCAL);
const BASE_URL = process.env.REACT_APP_ENV === "PROD" ? process.env.REACT_APP_SERVER : process.env.REACT_APP_LOCAL

export const axiosInstance = axios.create({
  baseURL:BASE_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use((config) => {
    const newAccessToken = config.headers[accessTokenHeaderName];
    const storageContent = getContentFromLocalStorage();
    if (newAccessToken && newAccessToken !== storageContent?.accessToken) {
        setAuthInStorage(newAccessToken, storageContent?.accessToken ? true : false);
    }
    return config;
})

axiosInstance.interceptors.request.use((config) => {
    const accessToken = getAccessTokenFromStorage();
    if (accessToken) {
        config.headers['Authorization'] = `Bearer ${accessToken}`
    }
    return config
})