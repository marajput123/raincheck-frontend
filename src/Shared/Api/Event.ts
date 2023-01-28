import { AxiosResponse } from "axios";
import { IEvent } from "src/Shared/Models/IEvent";
import { axiosInstance, setAuthorizationHeader } from "src/Shared/Axios";
import { IServerResponse } from "src/Shared/Models/IServerResponse";
import { IUser } from "src/Shared/Models/IUser";
import { IMembershipCheck } from "src/Shared/Models/IMembership";


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
    const response = await axiosInstance.get<never, AxiosResponse<IServerResponse<IEvent[]>>>(`/events/${eventId}`)
    return response.data
  }  catch (err) {
    throw err
  }
}


export const fetchEventMemberList = async (eventId: string) => {
  try {
    setAuthorizationHeader();
    const response = await axiosInstance.get<never, AxiosResponse<IServerResponse<Omit<IUser, "_id">[]>>>(`/events/${eventId}/members`);
    return response.data;
  }  catch (err) {
    throw err
  }
}

export const fetchMembershipCheck = async (eventId: string, userId: string) => {
try {
    setAuthorizationHeader();
    const response = await axiosInstance.get<never, AxiosResponse<IServerResponse<IMembershipCheck>>>(`/events/${eventId}/members/${userId}`);
    return response.data;
  }  catch (err) {
    throw err
  }
}