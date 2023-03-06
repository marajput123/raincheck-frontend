import axios from "axios";
import { accessTokenHeaderName } from "src/Shared/Contants";
import { getAccessTokenFromStorage, getContentFromLocalStorage, setAuthInStorage } from "../Helpers";

const BASE_URL = "http://localhost:4000"

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