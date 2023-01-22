import { EventhubLocalStorage } from "src/Shared/Contants";
import { IUser } from "./Models/IUser";

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

export const isUserType = (object: any): object is IUser => {
    return "email" in object
}

export const randomImage = () => {
    const imageuris = [
        "https://images.unsplash.com/photo-1626058356005-3c9211371aa5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1615829253947-faef9cf73097?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80",
        "https://images.unsplash.com/photo-1673624801456-91d2af12ebf7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1036&q=80",
        "https://images.unsplash.com/photo-1673864489231-b6708695b97a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=987&q=80",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1380&q=80",
        "https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1380&q=80"
    ]
    const randomIndex = (Math.floor(Math.random()*12))%6
    return imageuris[randomIndex]
}