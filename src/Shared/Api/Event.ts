import { AxiosResponse } from "axios";
import { IEvent } from "src/Shared/Models/IEvent";
import { axiosInstance } from "src/Shared/Axios";
import { IQuery, IServerResponse } from "src/Shared/Models/IServerResponse";


export const fetchPublicEvents = async (query?: { [key: string]: string | number }) => {
  try {
    const response = await axiosInstance.get<never, AxiosResponse<IServerResponse<IEvent[]>>>(
      "/events/public",
      { params: query }
    );
    return response.data;
  } catch (err) {
    throw err
  }
}

export const fetchMyEvents = async (query?: IQuery) => {
  try {
    const response = await axiosInstance.get<never, AxiosResponse<IServerResponse<IEvent[]>>>(`/events`, {
      params: query
    })
    return response.data
  } catch (err) {
    throw err
  }
}

export const fetchEvent = async (eventId: string) => {
  try {
    const response = await axiosInstance.get<never, AxiosResponse<IServerResponse<IEvent[]>>>(`/events/${eventId}`)
    return response.data
  } catch (err) {
    throw err
  }
}



