import { AxiosResponse } from "axios";
import { axiosInstance } from "src/Shared/Axios";
import { IServerResponse } from "src/Shared/Models/IServerResponse";
import { IUser } from "src/Shared/Models/User/IUser";
import { IMembershipCheck } from "src/Shared/Models/IMembership";

export const fetchEventMemberList = async (eventId: string) => {
  try {
    ;
    const response = await axiosInstance.get<never, AxiosResponse<IServerResponse<Omit<IUser, "_id">[]>>>(`/events/${eventId}/members`);
    return response.data;
  } catch (err) {
    throw err
  }
}

export const fetchMembershipCheck = async (eventId: string, userId: string) => {
  try {
    ;
    const response = await axiosInstance.get<never, AxiosResponse<IServerResponse<IMembershipCheck>>>(`/events/${eventId}/members/${userId}`);
    return response.data;
  } catch (err) {
    throw err
  }
}
