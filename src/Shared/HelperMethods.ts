import { EventhubLocalStorage } from "src/Shared/Contants";

export const EmptyString = "";

export const getCookie = (name: string) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
        // parts.pop().split(';').shift()
        return ""
    }
}

export const parseBase64 = (token: string) => {
    var base64 = token.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};

export const mockAsync = async (returnValue: any, seconds = 3000) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(returnValue)
        }, seconds)
    })
}


interface IAuthFromStorage {
    accessToken?: string;
    userId?: string
}

export const getAuthFromStorage = (): IAuthFromStorage => {
    let eventhubAuthStorage = sessionStorage.getItem(EventhubLocalStorage.eventhubAuth);
    if(!eventhubAuthStorage){
        eventhubAuthStorage= localStorage.getItem(EventhubLocalStorage.eventhubAuth);
    }
  
    if (!eventhubAuthStorage) {
      return {}
    } else {
      const parsedEventhubAuthStorage = JSON.parse(eventhubAuthStorage);
      return {
        accessToken: parsedEventhubAuthStorage.accessToken,
        userId: parsedEventhubAuthStorage.userId
      }
    }
  };

export const setAuthInStorage = (accessToken: string, userId: string, persist: boolean) => {
    if (persist) {
        localStorage.setItem(EventhubLocalStorage.eventhubAuth, JSON.stringify({ accessToken, userId }))
    } else {
        sessionStorage.setItem(EventhubLocalStorage.eventhubAuth, JSON.stringify({ accessToken, userId }))
    }
}


export const clearAuthInStorage = () => {
    localStorage.removeItem(EventhubLocalStorage.eventhubAuth)
    sessionStorage.removeItem(EventhubLocalStorage.eventhubAuth)
}
