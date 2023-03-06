import { EventhubLocalStorage } from "src/Shared/Contants";
import { URLSearchParams } from "url";
import { IAllSearchQuery } from "../Models/ISearchParams";
import { IUser } from "../Models/User/IUser";

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


export const getAccessTokenFromStorage = (): string => {
    let storageContent = getContentFromLocalStorage();
    if (!storageContent?.accessToken) {
        storageContent = getContentFromSessionStorage()
    }

    if (!storageContent) {
        return
    }

    return storageContent.accessToken as string
};

export const getContentFromLocalStorage = () => {
    const authStorage = localStorage.getItem(EventhubLocalStorage.eventhubAuth);
    if (!authStorage) {
        return
    }
    const parsedStorage = JSON.parse(authStorage)
    return {accessToken: parsedStorage.accessToken}
};

export const getContentFromSessionStorage = () => {
    const authStorage = sessionStorage.getItem(EventhubLocalStorage.eventhubAuth);
    if (!authStorage) {
        return
    }
    const parsedStorage = JSON.parse(authStorage)
    return {accessToken: parsedStorage.accessToken}
}

export const setAuthInStorage = (accessToken: string, persist: boolean) => {
    if (persist) {
        localStorage.setItem(EventhubLocalStorage.eventhubAuth, JSON.stringify({ accessToken }))
    } else {
        sessionStorage.setItem(EventhubLocalStorage.eventhubAuth, JSON.stringify({ accessToken }))
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
    const randomIndex = (Math.floor(Math.random() * 12)) % 6
    return imageuris[randomIndex]
}

export const constructUri = (uri: string, queryParams: IAllSearchQuery) => {
  let query = ""
  Object.keys(queryParams).forEach(queryKey => {
    if (!queryParams[queryKey]) {
      return;
    }

    if (query.length > 0) {
      query += "&"
    }

    query += `${queryKey}=${queryParams[queryKey]}`;
  });

  return `${uri}?${query}`;
}


export const constructQueryFromParams = (urlQueryParams: URLSearchParams): IAllSearchQuery => {
  const query = {};
  urlQueryParams.forEach((value, key) => {
    query[key] = value
  });

  return query;
}