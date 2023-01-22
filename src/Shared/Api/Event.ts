import { IEvent } from "../Models/IEvent";
import { faker } from '@faker-js/faker';
import { axiosInstance, setAuthorizationHeader } from "../Axios";
import { AxiosResponse } from "axios";
import { IServerResponse } from "../Models/IServerResponse";
import { IUser } from "../Models/IUser";


export const fetchPublicEvents = async () => {
    try {
        setAuthorizationHeader();
        const response = await axiosInstance.get<never, AxiosResponse<IServerResponse<IEvent[]>>>("/events/public");
        return response.data;
      } catch (err) {
        throw err
      }
}

export const fetchAllUserEvents = async () => {
  try {
    setAuthorizationHeader();
    const response = await axiosInstance.get<never, AxiosResponse<IServerResponse<IEvent[]>>>("/events")
    return response.data
  } catch (err) {
    throw err
  }
}

export const fetchEvent = async (eventId: string) => {
  try {
    setAuthorizationHeader();
    const response = await axiosInstance.get<never, AxiosResponse<IServerResponse<IEvent>>>(`/events/${eventId}`)
    return response.data
  }  catch (err) {
    throw err
  }
}