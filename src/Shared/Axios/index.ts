import _axios from "axios"
import { EventhubLocalStorage } from "src/Shared/Contants";

const BASE_URL = "http://localhost:4000"

export const setAuthorizationHeader = () => {
  let eventhubAuthStorage = sessionStorage.getItem(EventhubLocalStorage.eventhubAuth);

  if (!eventhubAuthStorage) {
    eventhubAuthStorage = localStorage.getItem(EventhubLocalStorage.eventhubAuth);
  }

  if (eventhubAuthStorage) {
    const parsedEventhubAuthStorage = JSON.parse(eventhubAuthStorage);
    axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${parsedEventhubAuthStorage.accessToken}`
  } 
};

export const axiosInstance =  _axios.create({
  baseURL:BASE_URL,
})